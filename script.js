document.addEventListener('DOMContentLoaded', () => {
    // Dados da música - "Lions" por Skillet
    const musicData = {
        title: "Lions",
        artist: "Skillet",
        albumCover: "./imagens/skillet.png", // Caminho local para a capa do álbum
        // A duração será obtida do elemento de áudio real (.mp4), então não precisamos mais hardcode
        lyrics: [
            // Tempos ajustados para uma duração de 3:22 (202 segundos) - AJUSTE MANUAL FINO AINDA PODE SER NECESSÁRIO!
            // Adicionado aproximadamente +6000ms a cada tempo como ponto de partida para seu ajuste fino.
            { text: "Today we live, today we breathe", time: 6000 }, // Era 0 + 6000
            { text: "Today we know that we are strong and when we are weak", time: 8300 }, // Era 2300 + 6000
            { text: "Today we trust, we overcome", time: 11700 }, // Era 5700 + 6000
            { text: "Take every chain that kept us slaves and throw em' off", time: 14500 }, // Era 8500 + 6000
            { text: "We're not waiting for permission", time: 19000 }, // Era 13000 + 6000
            { text: "We defy our inhibition", time: 21000 }, // Era 15000 + 6000
            { text: "Like our middle name is fearless", time: 23500 }, // Era 17500 + 6000
            { text: "Unafraid", time: 25500 }, // Era 19500 + 6000

            { text: "If we're gonna fly, we fly like eagles", time: 27600 }, // Era 21600 + 6000
            { text: "Arms out wide", time: 30300 }, // Era 24300 + 6000
            { text: "If we're gonna fear, we fear no evil", time: 32800 }, // Era 26800 + 6000
            { text: "We will rise", time: 34800 }, // Era 28800 + 6000
            { text: "By your power, we will go", time: 36800 }, // Era 30800 + 6000
            { text: "By your spirit, we are bold", time: 39300 }, // Era 33300 + 6000
            { text: "If we're gonna stand, we stand as giants", time: 41800 }, // Era 35800 + 6000
            { text: "If we're gonna walk, we walk as lions", time: 44300 }, // Era 38300 + 6000
            { text: "We walk as lions", time: 46800 }, // Era 40800 + 6000

            { text: "Today is ours, it's always been", time: 50000 }, // Era 44000 + 6000
            { text: "Before we face the fight", time: 52000 }, // Era 46000 + 6000
            { text: "We know who's gonna win", time: 53900 }, // Era 47900 + 6000
            { text: "We live by faith and not by sight", time: 56400 }, // Era 50400 + 6000
            { text: "We don't want safe and quiet", time: 58800 }, // Era 52800 + 6000
            { text: "We don't wanna run and hide", time: 60800 }, // Era 54800 + 6000
            { text: "This is not an intermission", time: 62800 }, // Era 56800 + 6000
            { text: "It's our time, not gonna miss it", time: 65000 }, // Era 59000 + 6000
            { text: "You've already called us fearless", time: 67500 }, // Era 61500 + 6000
            { text: "Unafraid", time: 69500 }, // Era 63500 + 6000

            { text: "If we're gonna fly, we fly like eagles", time: 71500 }, // Era 65500 + 6000
            { text: "Arms out wide", time: 74200 }, // Era 68200 + 6000
            { text: "If we're gonna fear, we fear no evil", time: 76700 }, // Era 70700 + 6000
            { text: "We will rise", time: 78700 }, // Era 72700 + 6000
            { text: "By your power, we will go", time: 80700 }, // Era 74700 + 6000
            { text: "By your spirit, we are bold", time: 83200 }, // Era 77200 + 6000
            { text: "If we're gonna stand, we stand as giants", time: 85700 }, // Era 79700 + 6000
            { text: "If we're gonna walk, we walk as lions", time: 88200 }, // Era 82200 + 6000
            { text: "We walk as lions", time: 90700 }, // Era 84700 + 6000

            { text: "Oh, everywhere we go", time: 93500 }, // Era 87500 + 6000
            { text: "The battle has been won", time: 96000 }, // Era 90000 + 6000
            { text: "We know you've gone before us", time: 98500 }, // Era 92500 + 6000
            { text: "So, we're taking hold of faith", time: 101000 }, // Era 95000 + 6000
            { text: "With every step we take", time: 103000 }, // Era 97000 + 6000
            { text: "We know we'll rise victorious", time: 105500 }, // Era 99500 + 6000

            // Refrão final e encerramento - Ajustados para a duração de 3:22
            { text: "If we're gonna fly, we fly like eagles", time: 108500 }, // Era 102500 + 6000
            { text: "Arms out wide", time: 111200 }, // Era 105200 + 6000
            { text: "If we're gonna fear, we fear no evil", time: 113700 }, // Era 107700 + 6000
            { text: "We will rise", time: 115700 }, // Era 109700 + 6000
            { text: "By your power, we will go", time: 117700 }, // Era 111700 + 6000
            { text: "By your spirit, we are bold", time: 120200 }, // Era 114200 + 6000
            { text: "If we're gonna stand, we stand as giants", time: 122700 }, // Era 116700 + 6000
            { text: "If we're gonna walk, we walk as lions", time: 125200 }, // Era 119200 + 6000
            { text: "We walk as lions", time: 127700 }, // Era 121700 + 6000
            { text: "", time: 130000 }, // Pequeno espaço antes do final
            { text: "...", time: 200000 } // Linha final próxima ao fim da música (202000ms = 3:22)
        ]
    };

    // Referências aos elementos do DOM
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
    const fullscreenButton = document.getElementById('fullscreen-button');
    const openLyricsButton = document.getElementById('open-lyrics-button');
    const closeLyricsButton = document.getElementById('close-lyrics-button');
    const musicAudio = document.getElementById('music-audio'); // Referência ao elemento de áudio

    let currentLyricIndex = 0;
    let lyricsLines; // Variável para armazenar as linhas de letra

    // --- Funções Auxiliares ---

    // Formata o tempo de segundos para MM:SS
    const formatTime = (totalSeconds) => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00"; // Lida com valores inválidos
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Carrega os dados da música na UI
    const loadMusic = (data) => {
        albumCoverImg.src = data.albumCover;
        mainMusicContainer.style.backgroundImage = `url(${data.albumCover})`;
        musicTitleElement.textContent = data.title;
        artistNameElement.textContent = data.artist;
        // totalTimeSpan será atualizado por 'loadedmetadata' do musicAudio
        
        lyricsContainer.innerHTML = '';
        data.lyrics.forEach((line, index) => {
            const p = document.createElement('p');
            p.classList.add('lyrics-line');
            p.textContent = line.text;
            p.dataset.time = line.time; // Tempo em milissegundos
            lyricsContainer.appendChild(p);
        });
        lyricsLines = document.querySelectorAll('.lyrics-line');
        
        resetPlayer();
    };

    // Destaque da linha atual da letra e rolagem automática
    const highlightAndScrollLyric = () => {
        document.querySelectorAll('.lyrics-line.active-lyric').forEach(line => {
            line.classList.remove('active-lyric');
        });

        if (currentLyricIndex >= 0 && currentLyricIndex < lyricsLines.length) {
            const currentLine = lyricsLines[currentLyricIndex];
            currentLine.classList.add('active-lyric');

            const containerScrollTop = lyricsContainer.scrollTop;
            const containerHeight = lyricsContainer.clientHeight;
            const lineHeight = currentLine.offsetHeight;
            const lineOffsetTop = currentLine.offsetTop;

            const targetScrollTop = lineOffsetTop - (containerHeight / 2) + (lineHeight / 2);

            // Apenas scrolla se a linha não estiver visível ou estiver muito na borda
            if (lineOffsetTop < containerScrollTop + 20 || lineOffsetTop + lineHeight > containerScrollTop + containerHeight - 20) {
                lyricsContainer.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Atualiza a barra de progresso e o tempo decorrido
    const updateProgress = () => {
        const duration = musicAudio.duration || 1; // Evita divisão por zero se duration for NaN/0
        const progressPercentage = (musicAudio.currentTime / duration) * 100;
        progressBarMusic.style.setProperty('--progress-width', `${progressPercentage}%`);
        currentTimeSpan.textContent = formatTime(musicAudio.currentTime);
    };

    // --- Controles do Player ---

    const playMusic = () => {
        // Tenta reproduzir. .catch() lida com o Promise retornado e evita erros no console se o autoplay for bloqueado.
        musicAudio.play().catch(error => {
            console.error("Erro ao tentar reproduzir o áudio:", error);
            // Poderíamos adicionar um alerta ao usuário aqui: alert("O navegador bloqueou a reprodução automática. Por favor, clique no botão de Play.");
        });
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    };

    const pauseMusic = () => {
        musicAudio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    };

    const togglePlayPause = () => {
        if (musicAudio.paused) { // Verifica a propriedade 'paused' do elemento de áudio
            playMusic();
        } else {
            pauseMusic();
        }
    };

    const nextMusic = () => {
        // Se a música estiver a menos de 1 segundo do final, reinicia. Senão, avança para o final.
        if (musicAudio.currentTime >= musicAudio.duration - 1) { 
            musicAudio.currentTime = 0;
            currentLyricIndex = 0;
            highlightAndScrollLyric();
            updateProgress();
            playMusic();
        } else {
            musicAudio.currentTime = musicAudio.duration; // Vai para o final da música
            currentLyricIndex = musicData.lyrics.length - 1; // Garante que a última linha da letra seja destacada
            highlightAndScrollLyric();
            updateProgress();
            pauseMusic(); // Pausa ao chegar no final
        }
    };

    const prevMusic = () => {
        // Se a música estiver nos primeiros 3 segundos, reinicia. Caso contrário, retrocede 10 segundos.
        if (musicAudio.currentTime < 3) {
            musicAudio.currentTime = 0;
        } else {
            musicAudio.currentTime -= 10; // Retrocede 10 segundos
        }
        
        // Encontra a linha de letra mais próxima ao novo tempo
        let closestLyricIndex = 0;
        const targetTimeMs = musicAudio.currentTime * 1000;
        for (let i = 0; i < musicData.lyrics.length; i++) {
            if (musicData.lyrics[i].time <= targetTimeMs) {
                closestLyricIndex = i;
            } else {
                break;
            }
        }
        currentLyricIndex = closestLyricIndex;
        highlightAndScrollLyric();
        updateProgress();
        playMusic(); // Continua tocando
    };

    const resetPlayer = () => {
        pauseMusic();
        musicAudio.currentTime = 0;
        currentLyricIndex = 0;
        updateProgress();
        highlightAndScrollLyric();
    };

    // Navegação na barra de progresso
    progressBarContainer.addEventListener('click', (e) => {
        const progressBarWidth = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        const percentage = (clickX / progressBarWidth);
        
        // Define o tempo do áudio com base no clique
        musicAudio.currentTime = musicAudio.duration * percentage;
        
        // Encontra a linha de letra mais próxima ao tempo clicado
        let closestLyricIndex = 0;
        const clickedTimeMs = musicAudio.currentTime * 1000; 
        for (let i = 0; i < musicData.lyrics.length; i++) {
            if (musicData.lyrics[i].time <= clickedTimeMs) {
                closestLyricIndex = i;
            } else {
                break;
            }
        }
        currentLyricIndex = closestLyricIndex;
        highlightAndScrollLyric();
        updateProgress();
    });


    // --- Eventos do Elemento de Áudio ---
    musicAudio.addEventListener('timeupdate', () => {
        updateProgress();

        const currentTimeMs = musicAudio.currentTime * 1000; // Converte para milissegundos
        let newLyricIndex = currentLyricIndex;

        // Avança o índice da letra se o tempo atual já passou do tempo da próxima linha
        while (newLyricIndex < musicData.lyrics.length - 1 &&
               currentTimeMs >= musicData.lyrics[newLyricIndex + 1].time) {
            newLyricIndex++;
        }

        // Retrocede o índice da letra (caso o usuário arraste a barra para trás)
        // Isso é importante para que o destaque volte corretamente se o usuário "rebobinar"
        while (newLyricIndex > 0 &&
               currentTimeMs < musicData.lyrics[newLyricIndex].time) {
            newLyricIndex--;
        }

        if (newLyricIndex !== currentLyricIndex) {
            currentLyricIndex = newLyricIndex;
            highlightAndScrollLyric();
        }
    });

    musicAudio.addEventListener('loadedmetadata', () => {
        // Quando os metadados do áudio são carregados, define a duração total
        totalTimeSpan.textContent = formatTime(musicAudio.duration);
        updateProgress(); // Atualiza a barra de progresso inicial
        highlightAndScrollLyric(); // Destaca a primeira linha após carregar (ou a correta se currentTime for > 0)
    });

    musicAudio.addEventListener('ended', () => {
        // Quando a música termina
        pauseMusic();
        musicAudio.currentTime = 0; // Reinicia o tempo para 0
        currentLyricIndex = 0;
        highlightAndScrollLyric();
        updateProgress();
    });


    // --- Interação com a Seção da Letra ---
    openLyricsButton.addEventListener('click', () => {
        lyricsSection.classList.add('show');
        // Garante que a letra correta seja destacada e rolada ao abrir
        highlightAndScrollLyric(); 
    });

    closeLyricsButton.addEventListener('click', () => {
        lyricsSection.classList.remove('show');
    });

    fullscreenButton.addEventListener('click', () => {
        if (lyricsSection.classList.contains('fullscreen')) {
            lyricsSection.classList.remove('fullscreen');
            fullscreenButton.querySelector('i').classList.remove('fa-compress');
            fullscreenButton.querySelector('i').classList.add('fa-expand');
        } else {
            lyricsSection.classList.add('fullscreen');
            fullscreenButton.querySelector('i').classList.remove('fa-expand');
            fullscreenButton.querySelector('i').classList.add('fa-compress');
        }
        // Ao mudar para tela cheia ou sair, a rolagem pode precisar ser reajustada
        highlightAndScrollLyric(); 
    });


    // --- Event Listeners dos Botões de Controle ---
    playPauseButton.addEventListener('click', togglePlayPause);
    prevButton.addEventListener('click', prevMusic);
    nextButton.addEventListener('click', nextMusic);

    // Carrega a música inicialmente
    loadMusic(musicData);
});