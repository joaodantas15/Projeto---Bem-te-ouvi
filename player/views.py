# player/views.py
from django.shortcuts import render

#def music_player_view(request):    VERSAO 1 ESTÁTICA   
    """
    Esta view é responsável por renderizar a página principal do player de música.
    """
    # No futuro, aqui vamos buscar as músicas do banco de dados.
    # Por agora, apenas renderizamos o template.
    #return render(request, 'player/letra.html')


# player/views.py 
from django.shortcuts import render, get_object_or_404
from .models import Musica

# ... sua view music_player_view existente ...

def detalhes_musica(request, musica_id):
    musica = get_object_or_404(Musica, pk=musica_id)
    context = {
        'musica': musica
    }
    return render(request, 'player/detalhes_musica.html', context)