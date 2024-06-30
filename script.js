const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const playIcon = document.querySelector('.play__icon');
const timeDiv = document.querySelector(".video__time");
const soundValue = document.querySelector(".sound__value");

const toggleElement = {
  'once': false,
}

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

function updateButton() {
  const icon = this.paused ? `videos/Property 1=Play.png` : `videos/Play & Pause.png`;
  playIcon.src = icon;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

// ===============================================

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - (hours * 3600)) / 60);
  let remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
  let arr = [minutes.toFixed(), remainingSeconds.toFixed()];
  return  arr;
}

setInterval(function(){
  let currentTime = formatTime(video.currentTime);
  let secounts = currentTime[1] < 10 ? "0" + currentTime[1] : currentTime[1];
  let minutes = currentTime[0] < 10 ? "0" + currentTime[0] : currentTime[0];
  timeDiv.innerHTML = `${minutes}:${secounts}`;
}, 500);

// =====================================================================

let TF = true;
function videoSoundValue() {
  const soundIcon = document.querySelector('.sound__value img');

  if(TF) {
    video.volume = 0;
    soundIcon.src = 'videos/Property 1=volume-mute-line.png';
    TF = false;
  } else if(!TF) {
    soundIcon.src = 'videos/Property 1=volume-up-line.png';
    video.volume = 1;
    TF = true;
  }
};

soundValue.addEventListener('click', videoSoundValue);
video.addEventListener('click', togglePlay, toggleElement);
video.addEventListener('play', updateButton, toggleElement);
video.addEventListener('pause', updateButton, toggleElement);
video.addEventListener('timeupdate', handleProgress, toggleElement);
toggle.addEventListener('click', togglePlay, toggleElement);
progress.addEventListener('click', scrub, toggleElement); 

window.addEventListener('keydown', (e)=> {
  if(e.keyCode === 32) {
    updateButton();
    togglePlay();
  }
});
