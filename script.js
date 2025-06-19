document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("meditation-audio");
  const video = document.getElementById("bg-video");
  const videoSource = video.querySelector("source");
  const playButton = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeButtons = document.querySelectorAll("#time-select button");
  const soundButtons = document.querySelectorAll(".sound-picker button");

  let duration = 600;
  let isPlaying = false;
  let timer;

  function updateDisplay() {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  function startTimer() {
    timer = setInterval(() => {
      if (duration <= 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        playButton.textContent = "Play";
        isPlaying = false;
      } else {
        duration--;
        updateDisplay();
      }
    }, 1000);
  }

  async function togglePlay() {
    if (!audio || !video) return;

    const audioSrc = audio.getAttribute('src');
    const videoSrc = videoSource?.getAttribute('src') || video.getAttribute('src');

    if (!audioSrc || !videoSrc) {
      console.warn("Missing media sources.");
      return;
    }

    if (!isPlaying) {
      try {
        await audio.play();
        video.play();
        playButton.textContent = "Pause";
        startTimer();
        isPlaying = true;
      } catch (err) {
        console.error("Playback failed", err);
      }
    } else {
      audio.pause();
      video.pause();
      clearInterval(timer);
      playButton.textContent = "Play";
      isPlaying = false;
    }
  }

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

      if (isPlaying) {
        audio.play();
        video.play();
      }
    });
  });

  playButton.addEventListener("click", togglePlay);

  // Initial update
  updateDisplay();
});
