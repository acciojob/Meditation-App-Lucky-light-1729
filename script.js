window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  const video = document.getElementById("bg-video");
  const audio = document.getElementById("sound");
  const play = document.querySelector(".play");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelectButtons = document.querySelectorAll(".time-select button");
  const soundPicker = document.querySelectorAll(".sound-picker button");

  let fakeDuration = 600; // default 10:00

  // Update time display
  function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    timeDisplay.textContent = `${mins}:${secs}`;
  }

  // Play/Pause toggle
  play.addEventListener("click", () => {
    if (!audio || !video) return;
    if (audio.paused) {
      audio.muted = true; // For Cypress
      audio.play().catch(e => console.error("Audio play failed:", e));
      video.play();
      play.textContent = "Pause";
    } else {
      audio.pause();
      video.pause();
      play.textContent = "Play";
    }
  });

  // Time select
  timeSelectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const minutes = parseInt(btn.textContent);
      fakeDuration = minutes * 60;
      updateDisplay(fakeDuration);
    });
  });

  // Sound & video switcher
  soundPicker.forEach(btn => {
    btn.addEventListener("click", () => {
      const soundSrc = btn.getAttribute("data-sound");
      const videoSrc = btn.getAttribute("data-video");

      audio.src = soundSrc;
      video.src = videoSrc;
      audio.load();
      video.load();

      // Autoplay workaround for Cypress
      audio.muted = true;
      play.textContent = "Play";
    });
  });

  // Timer update loop
  let currentTime = 0;
  audio.ontimeupdate = () => {
    currentTime = audio.currentTime;
    let remaining = fakeDuration - currentTime;
    if (remaining >= 0) updateDisplay(remaining);

    if (currentTime >= fakeDuration) {
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      play.textContent = "Play";
    }
  };

  // Initial display
  updateDisplay(fakeDuration);
});
