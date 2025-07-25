from django.db import models
from django.contrib.auth.models import User # Importar o modelo de Usuário do Django
import datetime

class Artista(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.nome

class Album(models.Model):
    titulo = models.CharField(max_length=200)
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE, related_name='albuns')
    ano_lancamento = models.IntegerField(null=True, blank=True)
    capa_album = models.ImageField(upload_to='album_covers/', null=True, blank=True)
    def __str__(self):
        return f'{self.titulo} - {self.artista.nome}'

class Musica(models.Model):
    titulo = models.CharField(max_length=200)
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE, related_name='musicas')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='musicas')
    compositor = models.CharField(max_length=200, default='Não informado')
    genero = models.CharField(max_length=50, default='Não informado')
    duracao = models.DurationField(default=datetime.timedelta(minutes=0))
    letra = models.TextField(blank=True)
    arquivo_audio = models.FileField(upload_to='audio_files/')
    def __str__(self):
        return self.titulo

# --- NOVO MODELO DE PLAYLIST ADICIONADO ABAIXO ---

class Playlist(models.Model):
    VISIBILIDADE_CHOICES = [
        ('PUB', 'Pública'),
        ('PRI', 'Privada'),
    ]

    nome = models.CharField(max_length=100)
    # Ajustado para ser opcional temporariamente
    usuario_criador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists', null=True, blank=True)
    musicas = models.ManyToManyField(Musica, blank=True, related_name='playlists')
    visibilidade = models.CharField(max_length=3, choices=VISIBILIDADE_CHOICES, default='PRI')
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # Adicionamos uma verificação para o caso de não haver usuário
        criador = self.usuario_criador.username if self.usuario_criador else "Sem criador"
        return f'{self.nome} - {criador}'