# player/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.music_player_view, name='music_player'),
]