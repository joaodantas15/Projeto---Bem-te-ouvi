document.addEventListener('DOMContentLoaded', () => {
    // 1. LER OS DADOS DA PÁGINA EM VEZ DE TÊ-LOS NO CÓDIGO
    const playlistDataElement = document.getElementById('playlist-data');
    if (!playlistDataElement) {
        console.error("Elemento com dados da playlist não encontrado!");
        return;
    }
    const playlist = JSON.parse(playlistDataElement.textContent);


    // --- VARIÁVEIS DE ESTADO DO PLAYER ---
    let currentMusicIndex = 0;
    let lyricsLines = [];

    // --- REFERÊNCIAS AOS ELEMENTOS DO DOM ---
    const mainMusicContainer = document.getElementById('main-music-container');
    const albumCoverImg = document.getElementById('album-cover');
    const musicTitleElement = document.querySelector('.music-title');
    const artistNameElement = document.querySelector('.artist-name');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = playPauseButton.querySelector('i');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBarMusic = document.querySelector('.progress-bar-music');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');
    const lyricsSection = document.querySelector('.lyrics-section');
    const openLyricsButton = document.getElementById('open-lyrics-button');
    const closeLyricsButton = document.getElementById('close-lyrics-button');
    const musicAudio = document.getElementById('music-audio');


    // --- FUNÇÕES AUXILIARES ---

    const formatTime = (totalSeconds) => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const loadMusic = (index) => {
        if (!playlist || playlist.length === 0 || index < 0 || index >= playlist.length) {
            console.error("Playlist vazia ou índice de música inválido.");
            // Opcional: desabilitar botões do player
            return;
        }

        currentMusicIndex = index;
        const currentMusic = playlist[currentMusicIndex];

        albumCoverImg.src = currentMusic.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${currentMusic.albumCover})`;
        musicTitleElement.textContent = currentMusic.title;
        artistNameElement.textContent = currentMusic.artist;
        musicAudio.src = currentMusic.audioSrc;

        // 2. ATUALIZAÇÃO DA LÓGICA DA LETRA
        lyricsContainer.innerHTML = '';
        if (currentMusic.lyrics) {
            // A letra agora é um texto único. Quebramos em linhas.
            const lines = currentMusic.lyrics.split('\n');
            lines.forEach(lineText => {
                const p = document.createElement('p');
                p.classList.add('lyrics-line');
                p.textContent = lineText || '...'; // Adiciona '...' para linhas vazias
                lyricsContainer.appendChild(p);
            });
        }
        // A funcionalidade de sincronia por tempo foi removida,
        // pois o modelo atual não armazena o tempo de cada linha.

        resetPlayer();
    };
    
    // O Destaque da linha de letra foi simplificado, pois não há mais tempo
    const highlightAndScrollLyric = () => {
        // Esta função pode ser reativada no futuro se voltarmos a ter letras com tempo.
    };

    const updateProgress = () => {
        if (!musicAudio.duration) return;
        const duration = musicAudio.duration;
        const progressPercentage = (musicAudio.currentTime / duration) * 100;
        progressBarMusic.style.setProperty('--progress-width', `${progressPercentage}%`);
        currentTimeSpan.textContent = formatTime(musicAudio.currentTime);
    };


    // --- CONTROLES DO PLAYER (sem grandes alterações) ---

    const playMusic = () => {
        musicAudio.play().catch(error => console.error("Erro ao tocar áudio:", error));
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    };

    const pauseMusic = () => {
        musicAudio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    };

    const togglePlayPause = () => {
        if (musicAudio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    };

    const nextMusic = () => {
        const nextIndex = (currentMusicIndex + 1) % playlist.length;
        loadMusic(nextIndex);
        playMusic();
    };

    const prevMusic = () => {
        const prevIndex = (currentMusicIndex - 1 + playlist.length) % playlist.length;
        loadMusic(prevIndex);
        playMusic();
    };
    
    const resetPlayer = () => {
        pauseMusic();
        musicAudio.currentTime = 0;
        updateProgress();
        musicAudio.addEventListener('loadedmetadata', () => {
            totalTimeSpan.textContent = formatTime(musicAudio.duration);
        }, { once: true });
    };

    progressBarContainer.addEventListener('click', (e) => {
        if (!musicAudio.duration) return;
        const progressBarWidth = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        musicAudio.currentTime = (clickX / progressBarWidth) * musicAudio.duration;
        updateProgress();
    });

    // --- EVENTOS DO ELEMENTO DE ÁUDIO ---
    musicAudio.addEventListener('timeupdate', updateProgress);
    musicAudio.addEventListener('ended', nextMusic);
    
    // --- INTERAÇÃO COM A SEÇÃO DA LETRA ---
    openLyricsButton.addEventListener('click', () => lyricsSection.classList.add('show'));
    closeLyricsButton.addEventListener('click', () => lyricsSection.classList.remove('show'));

    // --- EVENT LISTENERS DOS BOTÕES DE CONTROLE ---
    playPauseButton.addEventListener('click', togglePlayPause);
    prevButton.addEventListener('click', prevMusic);
    nextButton.addEventListener('click', nextMusic);

    // --- INICIALIZAÇÃO ---
    // Carrega a primeira música da playlist que veio do Django
    loadMusic(currentMusicIndex);
});