const bgVideo = document.getElementById('bgVideo');
const audio = new Audio('Sounds/beach.mp3');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600; // default 10 min
let isPlaying = false;

audio.loop = true;

// Time buttons
timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'smaller-mins') fakeDuration = 120;
    else if (button.id === 'medium-mins') fakeDuration = 300;
    else if (button.id === 'long-mins') fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Sound picker
soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    const soundSrc = button.getAttribute('data-sound');
    const videoSrc = button.getAttribute('data-video');
    audio.src = soundSrc;
    bgVideo.src = videoSrc;
    if (isPlaying) {
      audio.play();
      bgVideo.play();
    }
  });
});

// Play / Pause toggle
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    bgVideo.play();
    playBtn.textContent = 'Pause';
    isPlaying = true;
    startTimer();
  } else {
    audio.pause();
    bgVideo.pause();
    playBtn.textContent = 'Play';
    isPlaying = false;
    clearInterval(timer);
  }
});

// Update display
function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  timeDisplay.textContent = `${mins}:${secs}`;
}

// Countdown
let timer;
function startTimer() {
  let current = fakeDuration;
  updateTimeDisplay(current);
  timer = setInterval(() => {
    current--;
    updateTimeDisplay(current);
    if (current <= 0) {
      clearInterval(timer);
      audio.pause();
      bgVideo.pause();
      playBtn.textContent = 'Play';
      isPlaying = false;
    }
  }, 1000);
}
