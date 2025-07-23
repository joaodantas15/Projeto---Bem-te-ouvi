# player/views.py 
from django.shortcuts import render, get_object_or_404
from .models import Musica
import json
from django.db.models import Q

def music_player_view(request):
    # Pega o ID da música que queremos tocar a partir da URL (?play=7)
    song_to_play_id = request.GET.get('play', None)
    
    # Pega todas as músicas do banco de dados
    all_songs = list(Musica.objects.all().select_related('artista', 'album'))
    
    playlist_ordered = []

    # Se um ID foi especificado, encontre essa música e coloque-a no início da lista
    if song_to_play_id:
        song_to_play = None
        for song in all_songs:
            if str(song.id) == song_to_play_id:
                song_to_play = song
                break
        
        if song_to_play:
            # Adiciona a música escolhida primeiro
            playlist_ordered.append(song_to_play)
            # Adiciona as outras músicas, exceto a que já foi adicionada
            for song in all_songs:
                if song.id != song_to_play.id:
                    playlist_ordered.append(song)
    else:
        # Se nenhuma música foi especificada, a playlist é a padrão
        playlist_ordered = all_songs

    # Transforma os objetos do Django em uma lista de dicionários
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
    context = {
        'musica': musica
    }
    return render(request, 'player/detalhes_musica.html', context)

def buscar(request):
    # Pega o parâmetro 'q' da URL (ex: /buscar/?q=skillet)
    query = request.GET.get('q')
    resultados = []

    if query:
         resultados = Musica.objects.filter(
            Q(titulo__icontains=query) |
            Q(artista__nome__icontains=query) |
            Q(album__titulo__icontains=query)
        ).distinct() # .distinct() garante que não teremos resultados duplicados.

    context = {
        'query': query,
        'resultados': resultados
    }
    return render(request, 'player/resultados_busca.html', context)
