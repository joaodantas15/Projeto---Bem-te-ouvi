from django.urls import path
from . import views

app_name = 'player' 

urlpatterns = [
    path('', views.music_player_view, name='music_player'),
    path('musica/<int:musica_id>/', views.detalhes_musica, name='detalhes_musica'),
    path('buscar/', views.buscar, name='buscar'),
    # --- NOVAS ROTAS DE PLAYLIST ADICIONADAS ABAIXO ---
    path('playlist/criar/', views.criar_playlist, name='criar_playlist'),
    path('playlist/<int:playlist_id>/', views.detalhes_playlist, name='detalhes_playlist'),
    path('playlist/<int:playlist_id>/adicionar/<int:musica_id>/', views.adicionar_musica_playlist, name='adicionar_musica_playlist'),
    path('playlists/', views.listar_playlists, name='listar_playlists'),
     path('playlist/<int:playlist_id>/excluir/', views.excluir_playlist, name='excluir_playlist'),
     path('playlist/<int:playlist_id>/remover/<int:musica_id>/', views.remover_musica_playlist, name='remover_musica_playlist'),
]