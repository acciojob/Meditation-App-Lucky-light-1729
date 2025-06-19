window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const video = document.getElementById("video");
  const playButton = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeButtons = document.querySelectorAll("#time-select button");
  const soundButtons = document.querySelectorAll(".sound-picker button");

  let fakeDuration = 600;
  let isPlaying = false;
  let timer;

  // Format time for display
  function updateDisplay() {
    const minutes = Math.floor(fakeDuration / 60);
    const seconds = Math.floor(fakeDuration % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  // Start timer
  function startTimer() {
    timer = setInterval(() => {
      if (fakeDuration <= 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        playButton.textContent = "Play";
        isPlaying = false;
      } else {
        fakeDuration--;
        updateDisplay();
      }
    }, 1000);
  }

  // Toggle play/pause
  function togglePlay() {
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

  // Change duration
  timeButtons.forEach(button => {
    button.addEventListener("click", () => {
      clearInterval(timer);
      isPlaying = false;
      playButton.textContent = "Play";
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      video.currentTime = 0;

      if (button.id === "smaller-mins") fakeDuration = 120;
      else if (button.id === "medium-mins") fakeDuration = 300;
      else if (button.id === "long-mins") fakeDuration = 600;

      updateDisplay();
    });
  });

  // Change sound and video
  soundButtons.forEach(button => {
    button.addEventListener("click", () => {
      const sound = button.getAttribute("data-sound");
      const vid = button.getAttribute("data-video");

      // Change audio
      audio.src = `Sounds/${sound}`;
      audio.load();

      // Change video
      const source = video.querySelector("source");
      source.src = `Sounds/${vid}`;
      video.load();

      if (isPlaying) {
        audio.play();
        video.play();
      }
    });
  });

  playButton.addEventListener("click", togglePlay);

  // Initial time
  updateDisplay();
});
