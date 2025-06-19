window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  const video = document.querySelector("video");
  const audio = document.querySelector("audio");
  const playButton = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeButtons = document.querySelectorAll("#time-select button");
  const soundButtons = document.querySelectorAll(".sound-picker button");

  let duration = 600; // default: 10 min = 600s
  let isPlaying = false;
  let timer;

  // 🕒 Update time display
  function updateDisplay(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    timeDisplay.textContent = `${min}:${sec}`;
  }

  // ▶️ Play or pause audio and video
  function togglePlay() {
  if (!audio || !video) return;

  // Get src attribute, not .src (which becomes absolute path)
  const audioSrc = audio.getAttribute('src');
  const videoSrc = video.querySelector('source')?.getAttribute('src') || video.getAttribute('src');

  if (!audioSrc || !videoSrc) {
    console.warn("Missing media sources.");
    return;
  }

  if (!isPlaying) {
    audio.play();
    video.play();
    playButton.textContent = "Pause";
    startTimer();
  } else {
    audio.pause();
    video.pause();
    playButton.textContent = "Play";
    clearInterval(timer);
  }

  isPlaying = !isPlaying;
}

  // ⏳ Countdown timer
  function startTimer() {
    let currentTime = duration;
    updateDisplay(currentTime);
    timer = setInterval(() => {
      currentTime--;
      if (currentTime < 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        video.currentTime = 0;
        playButton.textContent = "Play";
        isPlaying = false;
        updateDisplay(duration);
        return;
      }
      updateDisplay(currentTime);
    }, 1000);
  }

  // 🕹 Time selection
  timeButtons.forEach(button => {
    button.addEventListener("click", () => {
      clearInterval(timer);
      isPlaying = false;
      playButton.textContent = "Play";
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      video.currentTime = 0;

      if (button.id === "smaller-mins") duration = 120;
      else if (button.id === "medium-mins") duration = 300;
      else if (button.id === "long-mins") duration = 600;

      updateDisplay(duration);
    });
  });

  // 🎵 Sound and video switching
  soundButtons.forEach(button => {
    button.addEventListener("click", () => {
      const sound = button.getAttribute("data-sound");
      const vid = button.getAttribute("data-video");

      audio.src = `Sounds/${sound}`;
      video.src = `Videos/${vid}`;

      if (isPlaying) {
        audio.play();
        video.play();
      }
    });
  });

  // ▶️ Hook up play button
  playButton.addEventListener("click", togglePlay);

  // Initial time
  updateDisplay(duration);
});
