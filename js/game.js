//@ts-nocheck

const startGameBtn = document.querySelector(".btn");
const createGame = () => {
  for (let i = 0; i < game.ghosts; i++) {
    createGhost();
  }
  tempBoard.forEach((cell) => {
    drawBoard(cell);
  });
  for (let i = 0; i < game.size; i++) {
    game.x += ` ${game.h}px`;
  }
  game.grid.style.gridTemplateColumns = game.x;
  game.grid.style.gridTemplateRows = game.x;
  startPos();
};

const startGame = () => {
  myBoard.length = 0;
  ghosts.length = 0;
  game.grid.innerHTML = "";
  game.x = "";
  if (!player.gameWin) {
    player.score = 0;
  } else {
    player.gameWin = false;
  }

  player.gameOver = false;
  createGame();
  updateScoreAndLives();
  game.grid.focus();
  game.grid.display = "grid";
  game.player.style.display = "block";
  startGameBtn.style.display = "none";
};

const gameReset = () => {
  window.cancelAnimationFrame(player.play);
  game.inplay = false;
  player.pause = true;
  if (player.lives <= 0) {
    player.gameOver = true;
    endGame();
  }
  if (!player.gameOver) {
    setTimeout(startPos, 3000);
  }
};
const endGame = () => {
  player.gameWin = false;
  startGameBtn.style.display = "block";
};
const playerWins = () => {
  player.gameWin = true;
  game.inplay = false;
  player.pause = true;
  startGameBtn.style.display = "block";
};

const updateScoreAndLives = () => {
  if (player.lives <= 0) {
    game.lives.innerHTML = "GAME OVER!";
    game.gameOver = true;
  } else {
    game.score.innerHTML = `Score: ${player.score}`;
    game.lives.innerHTML = `Lives: ${player.lives}`;
  }
};
