const modal = document.getElementById("pauseModal");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");

function toggleModal() {
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

resumeBtn.addEventListener("click", () => {
    pauseGame();
});

restartBtn.addEventListener("click", () => {
    pauseGame();
    resetStopwatch();
    gameReset();
    startGame();
    if (player.powerUp) {
        stopPowerUp();
        game.player.style.backgroundColor = "lightgreen";
    }
});

function pauseGame() {
    if (game.inplay) {
      player.pause = !player.pause;
      if (player.pause) {
        toggleStopwatch();
        window.cancelAnimationFrame(player.play);
        toggleModal();
      } else {
        toggleStopwatch();
        player.play = requestAnimationFrame(move);
        toggleModal();
      }
    }
}