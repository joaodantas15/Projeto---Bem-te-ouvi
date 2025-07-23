from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # A linha mais importante: inclui todas as rotas do nosso app 'player'
    path('', include('player.urls')),
]

# Adiciona a rota para servir arquivos de Mídia em modo de desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)