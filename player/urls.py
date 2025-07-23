# player/urls.py
from django.urls import path
from . import views

app_name = 'player' 

urlpatterns = [
    path('', views.music_player_view, name='music_player'),
    path('musica/<int:musica_id>/', views.detalhes_musica, name='detalhes_musica'),
    path('buscar/', views.buscar, name='buscar'),
]