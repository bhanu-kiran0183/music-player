const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
//variables initialization
let i = 0;

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Music",
    artist: "Jacinto",
  },
  {
    name: "jacinto-2",
    displayName: "Hard Beat Mix",
    artist: "Hardwell",
  },
  {
    name: "jacinto-3",
    displayName: "Party Mix",
    artist: "Dua Lipa",
  },
  {
    name: "metric-1",
    displayName: "Workout Mix",
    artist: "Avicii",
  },
];

//check if playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//event listeners
playBtn.addEventListener("click", function () {
  isPlaying ? pauseSong() : playSong();
});

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//on load- select first song

//loadSong(songs[3]);
//console.log(songs[3]);

//event listeners for next and prev button
loadSong(songs[i]);
forwardBtn.addEventListener("click", function () {
  loadSong(songs[i]);
  i = i + 1;
  if (i > songs.length - 1) {
    i = 0;
  }
  pauseSong();
});
prevBtn.addEventListener("click", function () {
  loadSong(songs[i]);
  i = i - 1;
  if (i < 0) {
    i = songs.length - 1;
    //loadSong(songs[0]);
  }

  pauseSong();
});
console.log(songs.length);

function nextSong() {
  loadSong(songs[i]);
  console.log(songs[i]);
}

//update progress bar
music.addEventListener("timeupdate", (ele) => {
  if (isPlaying === true) {
    const { currentTime, duration } = ele.target;
    console.log(currentTime, duration);
    //console.log(ele);
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate display duration
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    //console.log(minutes, seconds);
    //displaying duration on screen
    durationEl.textContent = `${minutes}:${seconds}`;
    //calculate current duration
    let minutes1 = Math.floor(currentTime / 60);
    let seconds1 = Math.floor(currentTime % 60);
    console.log(minutes1, seconds1);
    if (seconds1 < 10) {
      seconds1 = `0${seconds1}`;
    }
    currentTimeEl.textContent = `${minutes1}:${seconds1}`;
  }
});

//event listener for setting progress bar

//set progress bar

function setProgressBar(e) {
  console.log(e);
  const { clientWidth } = e.srcElement;
  //const offestX1 = this.offsetX;
  const { offsetX } = e;
  console.log(clientWidth, offsetX);
  const { duration } = music;
  music.currentTime = (offsetX / clientWidth) * duration;
}

progressContainer.addEventListener("click", setProgressBar);

music.addEventListener("ended", () => {
  forwardBtn;
});
