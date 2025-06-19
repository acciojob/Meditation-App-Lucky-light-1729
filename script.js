const audio = document.getElementById('meditation-audio');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('.time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600;
let isPlaying = false;
let timer;

// Time selection
timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'smaller-mins') fakeDuration = 120;
    else if (button.id === 'medium-mins') fakeDuration = 300;
    else if (button.id === 'long-mins') fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Sound switching
soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    const soundSrc = button.getAttribute('data-sound');
    const videoSrc = button.getAttribute('data-video');
    audio.src = soundSrc;
    document.getElementById('bgVideo').src = videoSrc;

    if (isPlaying) {
      audio.play();
      document.getElementById('bgVideo').play();
    }
  });
});

// Play/Pause
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    document.getElementById('bgVideo').play();
    playBtn.textContent = 'Pause';
    isPlaying = true;
    startTimer();
  } else {
    audio.pause();
    document.getElementById('bgVideo').pause();
    playBtn.textContent = 'Play';
    isPlaying = false;
    clearInterval(timer);
  }
});

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  timeDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
  let current = fakeDuration;
  updateTimeDisplay(current);
  timer = setInterval(() => {
    current--;
    updateTimeDisplay(current);
    if (current <= 0) {
      clearInterval(timer);
      audio.pause();
      document.getElementById('bgVideo').pause();
      playBtn.textContent = 'Play';
      isPlaying = false;
    }
  }, 1000);
}
