from django import forms
from .models import Playlist

class PlaylistForm(forms.ModelForm):
    class Meta:
        model = Playlist
        # O formulário só precisa do nome e da visibilidade
        fields = ['nome', 'visibilidade']
        labels = {
            'nome': 'Nome da Playlist',
            'visibilidade': 'Visibilidade',
        }