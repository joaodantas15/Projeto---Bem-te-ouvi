from django.db import models
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