const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const audioElement = document.getElementById("audio");
const volumeDownBtn = document.getElementById("volume-down");
const volumeSlider = document.getElementById("volume-slider");
const volumeUpBtn = document.getElementById("volume-up");


// Set initial volume and update volume slider
music.volume = volumeSlider.value;

// Volume Down
volumeDownBtn.addEventListener("click", () => {
  if (music.volume > 0) {
    music.volume -= 0.1;
    volumeSlider.value = music.volume;
  }
});

// Volume Up
/* volumeUpBtn.addEventListener("click", () => {
  if (music.volume < 1) {
    music.volume += 0.1;
    volumeSlider.value = music.volume;
  }
}); */

// Volume Slider
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

// Músicas
const songs = [
    {
        son: "beliver",
        nomedaMusica: "Believer",
        artista: "Imagine Dragons",
    },
    {
        son: "Fear of the Dark 2015",
        nomedaMusica: "Fear of the Dark 2015",
        artista: "Iron Maiden",
    },
    {
        son: "Idol feat. May Abreu",
        nomedaMusica: "Idol",
        artista: "Vmz ft.May Abreu",
    },
    {
        son: "Expansão Infernal",
        nomedaMusica: "Expansão Infernal",
        artista: "Okabe",
    },
    {
        son: "Musashi Miyamoto",
        nomedaMusica: "Musashi Miyamoto | Prodígio",
        artista: "AniRap",
    },
    {
        son: "O Ébrio",
        nomedaMusica: "O Ébrio",
        artista: "Vicente Celestino",
    },
    {
        son: "RAP MOTIVACIONAL - BAKI",
        nomedaMusica: "RAP MOTIVACIONAL - BAKI",
        artista: "Águia",
    },
    {
        son: "Não Me Ligue Mais",
        nomedaMusica: "Não Me Ligue Mais",
        artista: "VmZ",
    },
    {
        son: "Evidências",
        nomedaMusica: "Evidências",
        artista: "Chitãozinho Xororó",
    },
    {
        son: "Arcane",
        nomedaMusica: "Arcane",
        artista: "Imagine Dragons",
    },
    {
        son: "Hino do Palmeiras",
        nomedaMusica: "Hino do Palmeiras",
        artista: "Mancha Verde",
    },
    {
        son: "Mc Poze Nos Anos 80",
        nomedaMusica: "Mc Poze Nos Anos 80",
        artista: "Poze",
    },
];

// Ver se está tocando
let isPlaying = false;


function loadSong(song) {
    title.textContent = song.nomedaMusica;
    artist.textContent = song.artista;
    music.src = `music/${song.son}.mp3`;
    image.src = `img/${song.son}.jpg`;
}


let songIndex = Math.floor(Math.random() * songs.length);
loadSong(songs[songIndex]);

// Duração
function setSongDuration(e) {
    const totalSeconds = Math.floor(e.target.duration);
    const durationMinutes = Math.floor(totalSeconds / 60);
    let durationSeconds = totalSeconds % 60;
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
}
// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Música anterior
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}

// Proxima Música
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}
// Volume
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('volume-slider');
    M.Range.init(slider);
  });

function barWidthAndCurrentTime() {
    const { duration, currentTime } = music;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
 
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
}

function updateProgressBar() {
    if (isPlaying) {
        barWidthAndCurrentTime();
    }
}

function setProgressBar(e) {
    console.log(e.clientX, e.offsetX)
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying) {
        barWidthAndCurrentTime();
    }
}


music.addEventListener("canplay", setSongDuration);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);