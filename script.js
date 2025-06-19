window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("meditation-audio");
  const video = document.getElementById("bg-video");
  const videoSource = video.querySelector("source");
  const playButton = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeButtons = document.querySelectorAll("#time-select button");
  const soundButtons = document.querySelectorAll(".sound-picker button");

  let duration = 600; // 10 minutes
  let currentTime = duration;
  let isPlaying = false;
  let timer;

  function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (currentTime <= 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        isPlaying = false;
        playButton.textContent = "Play";
        currentTime = duration;
        updateDisplay();
        return;
      }
      currentTime--;
      updateDisplay();
    }, 1000);
  }

  function togglePlay() {
    if (!audio || !video) return;

    const audioSrc = audio.getAttribute('src');
    const videoSrc = videoSource.getAttribute('src');

    if (!audioSrc || !videoSrc) {
      console.warn("Missing media sources.");
      return;
    }

    if (!isPlaying) {
      audio.play();
      video.play();
      playButton.textContent = "Pause";
      startTimer();
      isPlaying = true;
    } else {
      audio.pause();
      video.pause();
      clearInterval(timer);
      playButton.textContent = "Play";
      isPlaying = false;
    }
  }

  playButton.addEventListener("click", togglePlay);

  timeButtons.forEach(button => {
    button.addEventListener("click", () => {
      clearInterval(timer);
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      video.currentTime = 0;
      playButton.textContent = "Play";
      isPlaying = false;

      if (button.id === "smaller-mins") duration = 120;
      else if (button.id === "medium-mins") duration = 300;
      else if (button.id === "long-mins") duration = 600;

      currentTime = duration;
      updateDisplay();
    });
  });

  soundButtons.forEach(button => {
    button.addEventListener("click", () => {
      const sound = button.getAttribute("data-sound");
      const vid = button.getAttribute("data-video");

      audio.setAttribute("src", sound);
      videoSource.setAttribute("src", vid);
      video.load();
      audio.load();

      if (isPlaying) {
        audio.play();
        video.play();
      }
    });
  });

  // Initial display
  updateDisplay();
});
