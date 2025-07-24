document.addEventListener('DOMContentLoaded', () => {
    const playlistDataElement = document.getElementById('playlist-data');
    if (!playlistDataElement) { return; }
    let playlist = JSON.parse(playlistDataElement.textContent);
    let originalPlaylist = [...playlist];

    // --- ESTADO DO PLAYER ---
    let currentMusicIndex = 0;
    let isShuffle = false;
    let repeatMode = 'none';

    // --- ELEMENTOS DO DOM ---
    const mainMusicContainer = document.getElementById('main-music-container');
    const albumCoverImg = document.getElementById('album-cover');
    const musicTitleElement = document.querySelector('.music-title');
    const artistNameElement = document.querySelector('.artist-name');
    const musicAudio = document.getElementById('music-audio');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = playPauseButton.querySelector('i');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBarMusic = document.querySelector('.progress-bar-music');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');
    const shuffleButton = document.getElementById('shuffle-button');
    const repeatButton = document.getElementById('repeat-button');
    
    // Elementos da Letra
    const lyricsSection = document.querySelector('.lyrics-section');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const openLyricsButton = document.getElementById('open-lyrics-button');
    const closeLyricsButton = document.getElementById('close-lyrics-button');

    const loadMusic = (index) => {
        if (!playlist || playlist.length === 0) return;
        currentMusicIndex = index;
        const currentMusic = playlist[currentMusicIndex];
        albumCoverImg.src = currentMusic.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${currentMusic.albumCover})`;
        musicTitleElement.textContent = currentMusic.title;
        artistNameElement.textContent = currentMusic.artist;
        musicAudio.src = currentMusic.audioSrc;
        
        // --- LÓGICA SIMPLIFICADA PARA POPULAR A LETRA ---
        lyricsContainer.innerHTML = '';
        if (currentMusic.lyrics) {
            // Pega o texto completo, quebra por linha e cria um parágrafo para cada uma
            currentMusic.lyrics.split('\n').forEach(line => {
                const p = document.createElement('p');
                p.classList.add('lyrics-line'); // Reutilizamos a classe para o estilo
                p.textContent = line.trim() === '' ? '...' : line;
                lyricsContainer.appendChild(p);
            });
        }
        
        resetPlayer();
        playMusic();
    };
    
    // O resto do seu JS continua igual, mas sem a função de sync
    const resetPlayer = () => { pauseMusic(); musicAudio.currentTime = 0; updateProgress(); musicAudio.addEventListener('loadedmetadata', () => { totalTimeSpan.textContent = formatTime(musicAudio.duration); }, { once: true }); };
    const playMusic = () => { musicAudio.play().catch(e => console.error("Erro:", e)); playPauseIcon.classList.replace('fa-play', 'fa-pause'); };
    const pauseMusic = () => { musicAudio.pause(); playPauseIcon.classList.replace('fa-pause', 'fa-play'); };
    const togglePlayPause = () => musicAudio.paused ? playMusic() : pauseMusic();
    const updateProgress = () => { if (isNaN(musicAudio.duration)) return; const progress = (musicAudio.currentTime / musicAudio.duration) * 100; progressBarMusic.style.setProperty('--progress-width', `${progress}%`); currentTimeSpan.textContent = formatTime(musicAudio.currentTime); };
    const formatTime = (seconds) => { if (isNaN(seconds)) return '0:00'; const minutes = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; };
    const nextMusic = () => { if (repeatMode === 'one') { musicAudio.currentTime = 0; playMusic(); } else { let nextIndex = (currentMusicIndex + 1); if (nextIndex >= playlist.length) { if (repeatMode === 'all') { nextIndex = 0; } else { pauseMusic(); return; } } loadMusic(nextIndex); } };
    const prevMusic = () => { if (musicAudio.currentTime > 3) { musicAudio.currentTime = 0; } else { const prevIndex = (currentMusicIndex - 1 + playlist.length) % playlist.length; loadMusic(prevIndex); } };
    const toggleShuffle = () => { isShuffle = !isShuffle; shuffleButton.style.color = isShuffle ? '#1DB954' : 'inherit'; if (isShuffle) { const currentMusic = playlist[currentMusicIndex]; let restOfPlaylist = playlist.filter(song => song.id !== currentMusic.id); restOfPlaylist.sort(() => Math.random() - 0.5); playlist = [currentMusic, ...restOfPlaylist]; } else { const currentMusicId = playlist[currentMusicIndex].id; playlist = [...originalPlaylist]; currentMusicIndex = playlist.findIndex(song => song.id === currentMusicId); } };
    const toggleRepeat = () => { if (repeatMode === 'none') { repeatMode = 'all'; repeatButton.style.color = '#1DB954'; repeatButton.innerHTML = '<i class="fas fa-repeat"></i>'; } else if (repeatMode === 'all') { repeatMode = 'one'; repeatButton.style.color = '#1DB954'; repeatButton.innerHTML = '<i class="fas fa-repeat-1"></i>'; } else { repeatMode = 'none'; repeatButton.style.color = 'inherit'; repeatButton.innerHTML = '<i class="fas fa-repeat"></i>'; } };

    // Event Listeners
    playPauseButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextMusic);
    prevButton.addEventListener('click', prevMusic);
    shuffleButton.addEventListener('click', toggleShuffle);
    repeatButton.addEventListener('click', toggleRepeat);
    musicAudio.addEventListener('timeupdate', updateProgress); // Não chama mais syncLyrics
    musicAudio.addEventListener('ended', nextMusic);
    progressBarContainer.addEventListener('click', (e) => { if (isNaN(musicAudio.duration)) return; const width = progressBarContainer.clientWidth; const clickX = e.offsetX; musicAudio.currentTime = (clickX / width) * musicAudio.duration; });
    
    // Lógica da letra
    if (openLyricsButton && lyricsSection && closeLyricsButton) {
        openLyricsButton.addEventListener('click', () => lyricsSection.classList.add('show'));
        closeLyricsButton.addEventListener('click', () => lyricsSection.classList.remove('show'));
    }

    // Inicialização
    if (playlist.length > 0) {
        const initialMusic = playlist[0];
        albumCoverImg.src = initialMusic.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${initialMusic.albumCover})`;
        musicTitleElement.textContent = initialMusic.title;
        artistNameElement.textContent = initialMusic.artist;
        musicAudio.src = initialMusic.audioSrc;
        resetPlayer();
    }
});