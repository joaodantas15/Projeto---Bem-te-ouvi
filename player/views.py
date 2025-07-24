from django.shortcuts import render, redirect, get_object_or_404
from .models import Musica, Playlist # Adicionar Playlist
from .forms import PlaylistForm   
import json
from django.db.models import Q

def music_player_view(request):
    # Verifica se a URL pediu para tocar uma playlist específica (ex: /?playlist=3)
    playlist_to_play_id = request.GET.get('playlist', None)
    
    # Verifica se a URL pediu para tocar uma música específica (ex: /?play=7)
    song_to_play_id = request.GET.get('play', None)
    
    playlist_ordered = []

    # Se uma playlist foi especificada, ela tem prioridade
    if playlist_to_play_id:
        playlist = get_object_or_404(Playlist, pk=playlist_to_play_id)
        playlist_ordered = list(playlist.musicas.all().select_related('artista', 'album'))
    
    # Se não, verifica se uma música única foi especificada
    elif song_to_play_id:
        all_songs = list(Musica.objects.all().select_related('artista', 'album'))
        song_to_play = None
        for song in all_songs:
            if str(song.id) == song_to_play_id:
                song_to_play = song
                break
        if song_to_play:
            playlist_ordered.append(song_to_play)
            for song in all_songs:
                if song.id != song_to_play.id:
                    playlist_ordered.append(song)
    
    # Se nada foi especificado, carrega todas as músicas
    else:
        playlist_ordered = list(Musica.objects.all().select_related('artista', 'album'))

    # Transforma os objetos do Django em uma lista de dicionários para o JavaScript
    playlist_data = []
    for musica in playlist_ordered:
        playlist_data.append({
            'id': musica.id,
            'title': musica.titulo,
            'artist': musica.artista.nome,
            'albumCover': musica.album.capa_album.url if musica.album.capa_album else '',
            'audioSrc': musica.arquivo_audio.url if musica.arquivo_audio else '',
            'lyrics': musica.letra 
        })

    context = {
        'playlist_data': playlist_data
    }
    
    return render(request, 'player/letra.html', context)

def detalhes_musica(request, musica_id):
    musica = get_object_or_404(Musica, pk=musica_id)
    context = {'musica': musica}
    return render(request, 'player/detalhes_musica.html', context)

def buscar(request):
    query = request.GET.get('q')
    resultados = []
    
    # Busca todas as playlists existentes para exibi-las no dropdown
    playlists_usuario = Playlist.objects.all() # No futuro, filtraremos por request.user

    if query:
        resultados = Musica.objects.filter(
            Q(titulo__icontains=query) |
            Q(artista__nome__icontains=query) |
            Q(album__titulo__icontains=query)
        ).distinct()

    context = {
        'query': query,
        'resultados': resultados,
        'playlists': playlists_usuario # 👈 Enviando as playlists para o template
    }
    return render(request, 'player/resultados_busca.html', context)

# --- NOVAS VIEWS PARA PLAYLIST ADICIONADAS ABAIXO ---

def criar_playlist(request):
    if request.method == 'POST':
        form = PlaylistForm(request.POST)
        if form.is_valid():
            # Por enquanto, não associamos a um usuário
            playlist = form.save()
            return redirect('player:detalhes_playlist', playlist_id=playlist.id)
    else:
        form = PlaylistForm()
    
    context = {'form': form}
    return render(request, 'player/criar_playlist.html', context)

def detalhes_playlist(request, playlist_id):
    playlist = get_object_or_404(Playlist, pk=playlist_id)
    # Vamos listar todas as músicas para que o usuário possa adicioná-las no futuro
    musicas_disponiveis = Musica.objects.exclude(playlists__in=[playlist])
    context = {
        'playlist': playlist,
        'musicas_disponiveis': musicas_disponiveis
    }
    return render(request, 'player/detalhes_playlist.html', context)

def adicionar_musica_playlist(request, playlist_id, musica_id):
    # Pega a playlist e a música do banco de dados
    playlist = get_object_or_404(Playlist, pk=playlist_id)
    musica = get_object_or_404(Musica, pk=musica_id)
    
    # Adiciona a música à relação ManyToMany da playlist
    playlist.musicas.add(musica)
    
    # Redireciona o usuário de volta para a página de detalhes da playlist
    return redirect('player:detalhes_playlist', playlist_id=playlist.id)

def listar_playlists(request):
    # No futuro, quando tivermos login, filtraremos por: Playlist.objects.filter(usuario_criador=request.user)
    # Por enquanto, vamos listar todas as playlists criadas.
    playlists = Playlist.objects.all().order_by('-data_criacao')
    
    context = {
        'playlists': playlists
    }
    return render(request, 'player/listar_playlists.html', context)

def excluir_playlist(request, playlist_id):
    playlist = get_object_or_404(Playlist, pk=playlist_id)
    # No futuro, adicionaríamos uma verificação: if playlist.usuario_criador == request.user:
    playlist.delete()
    # Redireciona de volta para a lista de playlists
    return redirect('player:listar_playlists')

def remover_musica_playlist(request, playlist_id, musica_id):
    playlist = get_object_or_404(Playlist, pk=playlist_id)
    musica = get_object_or_404(Musica, pk=musica_id)
    
    # Remove a música da relação ManyToMany
    playlist.musicas.remove(musica)
    
    return redirect('player:detalhes_playlist', playlist_id=playlist.id)