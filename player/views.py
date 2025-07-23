# player/views.py 
from django.shortcuts import render, get_object_or_404
from .models import Musica
import json
from django.db.models import Q

def music_player_view(request):
    musicas_db = Musica.objects.all().select_related('artista', 'album')

    # Transforma os objetos do Django em uma lista de dicionários (parecido com o JS antigo)
    playlist_data = []
    for musica in musicas_db:
        playlist_data.append({
            'id': musica.id,
            'title': musica.titulo,
            'artist': musica.artista.nome,
            'albumCover': musica.album.capa_album.url if musica.album.capa_album else '',
            'audioSrc': musica.arquivo_audio.url if musica.arquivo_audio else '',
            # ATENÇÃO: A letra agora é um texto único. O JS irá tratar isso.
            'lyrics': musica.letra 
        })

    context = {
        # Converte a lista do Python para uma string JSON segura
        'playlist_json': json.dumps(playlist_data)
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
