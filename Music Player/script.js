const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const timeField = document.querySelector("#time")
const durationField = document.querySelector("#duration")

//song titles

const songs = ["hey", "summer", "ukulele"];

//keep track of songs

let songIndex = 0;
let currentTime = 0;
//initially load song info dom

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}


// event listeneters

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  setDuration(audio.duration)
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
    console.log(audio.duration);
  }
});

function setDuration(duration) {
    durationField.innerHTML = getFormattedTime(duration);
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();

}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function getFormattedTime (currentTime) {
    const time = Math.floor(currentTime);
    const minutes = Math.floor( time / 60);
    const seconds = time % 60;
    return `${minutes <= 9 ? `0${minutes}` : minutes} : ${seconds <= 9 ? `0${seconds}` : seconds} `
}

function updateTimer(currentTime, duration) {
    
    timeField.innerHTML = getFormattedTime(currentTime)
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  updateTimer(currentTime);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


function progressTimer(){
    const start = 0 ;
    //3min
    

}
//Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener('ended',nextSong)

//settimeinterval 