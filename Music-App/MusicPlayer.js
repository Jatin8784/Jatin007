const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  duration = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerprogress = document.getElementById("player-progress"),
  prevbtn = document.getElementById("prev"),
  nextbtn = document.getElementById("next"),
  playbtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "./assets/1.mp3",
    displayname: "Akiyan Gulab",
    cover: "assets/1.jpg",
    artist: "Arijit Singh",
  },
  {
    path: "./assets/2.mp3",
    displayname: "Dilwara",
    cover: "assets/2.jpg",
    artist: "Jubin Nautiyal",
  },
  {
    path: "./assets/3.mp3",
    displayname: "Kaho Na Kaho",
    cover: "assets/3.jpg",
    artist: "KK",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayname;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;

  music.load();
  music.addEventListener("canplaythrough", () => {
    console.log("Audio loaded successfully"); // Debugging
  });
}

function playMusic() {
  isPlaying = true;
  playbtn.classList.replace("fa-play", "fa-pause");
  playbtn.setAttribute("title", "Pause");

  music.play().catch((error) => console.error("Playback error:", error)); // Debugging
}

function pauseMusic() {
  isPlaying = false;
  // change pause button icon
  playbtn.classList.replace("fa-pause", "fa-play");
  // set button hover title
  playbtn.setAttribute("title", "Play");
  music.pause();
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration: totalDuration, currentTime } = music;

  if (isNaN(totalDuration)) return; // Prevents errors if duration isn't set yet

  const progressPercent = (currentTime / totalDuration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");

  duration.textContent = `${Math.floor(totalDuration / 60)}:${formatTime(
    totalDuration % 60
  )}`;
  currentTimeEl.textContent = `${Math.floor(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerprogress.clientWidth;
  const clickX = e.offsetX;
  const totalDuration = music.duration;

  if (isNaN(totalDuration) || totalDuration === 0) return; // Prevent invalid calculations

  music.currentTime = (clickX / width) * totalDuration;
}

playbtn.addEventListener("click", togglePlay);
prevbtn.addEventListener("click", () => changeMusic(-1));
nextbtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerprogress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
