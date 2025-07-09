# player/views.py
from django.shortcuts import render

def music_player_view(request):
    """
    Esta view é responsável por renderizar a página principal do player de música.
    """
    # No futuro, aqui vamos buscar as músicas do banco de dados.
    # Por agora, apenas renderizamos o template.
    return render(request, 'player/letra.html')


