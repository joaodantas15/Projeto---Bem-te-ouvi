document.addEventListener('DOMContentLoaded', () => {
    const playlistDataElement = document.getElementById('playlist-data');
    if (!playlistDataElement) {
        console.error("Elemento com dados da playlist não encontrado!");
        return;
    }
    const playlist = JSON.parse(playlistDataElement.textContent);

    let currentMusicIndex = 0;

    // Elementos da UI
    const mainMusicContainer = document.getElementById('main-music-container');
    const albumCoverImg = document.getElementById('album-cover');
    const musicTitleElement = document.querySelector('.music-title');
    const artistNameElement = document.querySelector('.artist-name');
    const musicAudio = document.getElementById('music-audio');
    
    // Elementos do Player
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = playPauseButton.querySelector('i');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBarMusic = document.querySelector('.progress-bar-music');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');

    // Elementos da Letra
    const lyricsSection = document.querySelector('.lyrics-section');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const openLyricsButton = document.getElementById('open-lyrics-button');
    const closeLyricsButton = document.getElementById('close-lyrics-button');

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const loadMusic = (index) => {
        if (!playlist || playlist.length === 0) {
            console.error("Playlist está vazia ou não foi carregada.");
            return;
        }
        currentMusicIndex = index;
        const currentMusic = playlist[currentMusicIndex];

        albumCoverImg.src = currentMusic.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${currentMusic.albumCover})`;
        musicTitleElement.textContent = currentMusic.title;
        artistNameElement.textContent = currentMusic.artist;
        musicAudio.src = currentMusic.audioSrc;

        lyricsContainer.innerHTML = '';
        if (currentMusic.lyrics) {
            currentMusic.lyrics.split('\n').forEach(line => {
                const p = document.createElement('p');
                p.textContent = line.trim() === '' ? '...' : line;
                lyricsContainer.appendChild(p);
            });
        }
        resetPlayer();
    };

    const resetPlayer = () => {
        pauseMusic();
        musicAudio.currentTime = 0;
        updateProgress();
        musicAudio.addEventListener('loadedmetadata', () => {
            totalTimeSpan.textContent = formatTime(musicAudio.duration);
        }, { once: true });
    };

    const updateProgress = () => {
        if (isNaN(musicAudio.duration)) return;
        const progress = (musicAudio.currentTime / musicAudio.duration) * 100;
        progressBarMusic.style.setProperty('--progress-width', `${progress}%`);
        currentTimeSpan.textContent = formatTime(musicAudio.currentTime);
    };

    const playMusic = () => {
        musicAudio.play().catch(e => console.error("Erro ao tocar música:", e));
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
    };

    const pauseMusic = () => {
        musicAudio.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    };

    const togglePlayPause = () => musicAudio.paused ? playMusic() : pauseMusic();
    const nextMusic = () => loadMusic((currentMusicIndex + 1) % playlist.length);
    const prevMusic = () => loadMusic((currentMusicIndex - 1 + playlist.length) % playlist.length);

    // Event Listeners
    playPauseButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextMusic);
    prevButton.addEventListener('click', prevMusic);
    musicAudio.addEventListener('timeupdate', updateProgress);
    musicAudio.addEventListener('ended', nextMusic);
    progressBarContainer.addEventListener('click', (e) => {
        if (isNaN(musicAudio.duration)) return;
        const width = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        musicAudio.currentTime = (clickX / width) * musicAudio.duration;
    });

    // Lógica da letra
    if (openLyricsButton && lyricsSection && closeLyricsButton) {
        openLyricsButton.addEventListener('click', () => lyricsSection.style.transform = 'translateY(0)');
        closeLyricsButton.addEventListener('click', () => lyricsSection.style.transform = 'translateY(100%)');
    }

    // Inicialização
    loadMusic(currentMusicIndex);
});