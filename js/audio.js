//@ts-nocheck
let songIndex = 0;
const deathSound = new Audio("audio/Death.mp3");
const bonusSound = new Audio("audio/score.mp3");
const ghostSound = new Audio("audio/Ghost.mp3");
const muteBtn = document.getElementById("volumeIcon");
const volumeSlider = document.getElementById("volume-slider");
const songs = [
  "audio/theme.mp3",
  "audio/song2.mp3",
  "audio/song3.mp3",
  "audio/song4.mp3",
  "audio/song5.mp3",
];
const audio = new Audio(songs[songIndex]);

const playMusic = () => {
  console.log(songIndex);
  audio.src = songs[songIndex];
  songIndex += 1;
  audio.play();
};
audio.addEventListener("ended", playMusic);

volumeSlider.addEventListener("input", () => {
  const val = volumeSlider.valueAsNumber;
  audio.volume = val;
  deathSound.volume = val;
  bonusSound.volume = val;
  ghostSound.volume = val;
});

muteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    deathSound.muted = false;
    bonusSound.muted = false;
    ghostSound.muted = false;
    muteBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"/></svg>';
    return;
  }
  audio.muted = true;
  deathSound.muted = true;
  bonusSound.muted = true;
  ghostSound.muted = true;
  muteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/></svg>';
});
