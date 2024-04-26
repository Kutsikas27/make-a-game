const pauseModal = document.getElementById("pauseModal");
const gameOverModal = document.getElementById("gameOverModal");
const gameWinModal = document.getElementById("winModal");

function togglepauseModal() {
    if (pauseModal.style.display === "block") {
        pauseModal.style.display = "none";
    } else {
        pauseModal.style.display = "block";
    }
}

const restartGame = () => {
    gameOverModal.style.display = "none";
    gameWinModal.style.display = "none";
    if (pauseModal.style.display === "block" ||
        gameOverModal.style.display === "block" ||
        gameWinModal.style.display === "block"
    ) pauseGame();
    resetStopwatch();
    startGame();
    if (player.powerUp) {
        stopPowerUp();
        game.player.style.backgroundColor = "lightgreen";
    }
}

function pauseGame() {
      player.pause = !player.pause;
      if (player.pause) {
        toggleStopwatch();
        window.cancelAnimationFrame(player.play);
        togglepauseModal();
      } else {
        toggleStopwatch();
        player.play = requestAnimationFrame(move);
        togglepauseModal();
      }
}