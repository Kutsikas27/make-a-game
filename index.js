//@ts-nocheck
const board = ["pink", "blue", "green"];
const myBoard = [];
const ghosts = [];
let ghostcool = 0;
const game = {
  x: "",
  y: "",
  h: (window.innerHeight - 75 - 80) / 32, // window height - scoreboard - padding / grid size
  size: 32,
  ghosts: 3,
  inplay: false,
  startGhost: [],
};

const player = {
  pos: 32,
  speed: 10,
  cool: 0,
  pause: false,
  score: 0,
  lives: 5,
  gameOver: true,
  gameWin: false,
  powerUp: false,
  powerCount: 0,
};
const keys = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};

document.addEventListener("DOMContentLoaded", () => {
  game.grid = document.querySelector(".grid");
  game.player = document.querySelector(".player");
  game.eye = document.querySelector(".eye");
  game.mouth = document.querySelector(".mouth");
  game.ghost = document.querySelector(".ghost");
  game.score = document.querySelector(".score");
  game.lives = document.querySelector(".lives");
  game.player.style.display = "none";
  game.ghost.style.display = "none";
  game.grid.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (e.code in keys) {
    keys[e.code] = true;
  }
  if (e.code === "Escape") {
    // pausees the game
    pauseGame();
  }
  if (!game.inplay && !player.pause) {
    // starts the game
    player.play = requestAnimationFrame(move);
    game.inplay = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.code in keys) {
    keys[e.code] = false;
  }
});
startGameBtn.addEventListener("click", startGame);
startGameBtn.addEventListener("click", playMusic);

const fpsCounter = () => {
  let frames = 0;
  let prevTime = Date.now();
  const currentTime = Date.now();
  frames++;
  if (currentTime - prevTime >= 1000) {
    //console.log("fps: ", frames);
    frames = 0;
    prevTime = currentTime;
  }
};

const move = () => {
  fpsCounter();
  if (game.inplay) {
    // check if player is caught by ghost
    if (ghosts.some((ghost) => ghost.pos === player.pos)) {
      if (player.powerUp) {
        ghosts.forEach((ghost, i) => {
          if (ghost.pos === player.pos) {
            ghostSound.play();
            player.score += 50;
            ghost.style.backgroundColor = "black";
            ghost.style.opacity = "0.8";
            ghost.pos = game.startGhost[i];
            myBoard[ghost.pos].append(ghost);
          }
        });
      } else {
        deathSound.play();
        player.lives--;
        updateScoreAndLives();
        gameReset();
      }
    }
    if (!player.pause) {
      player.cool--; //player cooldown slowdown
      if (player.cool < 0) {
        player.cool = -1;
        movePlayer();
      }
      ghostcool--;
      if (ghostcool < 0) {
        moveGhost();
        player.powerUp ? (ghostcool = 20) : (ghostcool = 10);
      }
    }
    myBoard[player.pos].append(game.player);
    player.play = requestAnimationFrame(move);
  }
};
const applyPowerUp = () => {
  if (player.powerUp) {
    player.powerCount--;
    game.player.style.backgroundColor = "red";
    if (player.powerCount < 20) {
      game.player.style.backgroundColor = "orange";
    }
    if (player.powerCount % 2) {
      game.player.style.backgroundColor = "white";
    }
    if (player.powerCount <= 0) {
      player.powerUp = false;
      game.player.style.backgroundColor = "lightgreen";
    }
  }
};

const stopPowerUp = () => {
  player.powerUp = false;
  player.powerCount = 0;
};

const moveGhost = () => {
  applyPowerUp();
  ghosts.forEach((ghost) => {
    if (player.powerCount > 0) {
      if (player.powerCount % 2) {
        ghost.style.backgroundColor = "white";
      } else {
        ghost.style.backgroundColor = "blue";
      }
    } else {
      ghost.style.backgroundColor = ghost.defaultColor;
    }

    myBoard[ghost.pos].append(ghost);
    ghost.counter--;
    const oldPos = ghost.pos; //original ghost position
    findDirection(ghost);
    if (ghost.counter <= 0) {
      if (ghost.dx == 0) {
        ghost.pos -= game.size;
      }
      if (ghost.dx == 1) {
        ghost.pos += game.size;
      }
      if (ghost.dx == 2) {
        ghost.pos += 1;
      }
      if (ghost.dx == 3) {
        ghost.pos -= 1;
      }
    }

    const valGhost = myBoard[ghost.pos]; //future of ghost pos
    if (valGhost.t == 1) {
      ghost.pos = oldPos;
    }
    myBoard[ghost.pos].append(ghost);
  });
};

const movePlayer = () => {
  const tempPos = player.pos; //current pos
  if (keys.ArrowRight) {
    player.pos += 1;
    game.eye.style.left = "20%";
    game.mouth.style.left = "60%";
    player.cool = player.speed; // set cooloff
  } else if (keys.ArrowLeft) {
    player.pos -= 1;
    game.eye.style.left = "60%";
    game.mouth.style.left = "0%";
    player.cool = player.speed; // set cooloff
  } else if (keys.ArrowUp) {
    player.pos -= game.size;
    player.cool = player.speed; // set cooloffS
  } else if (keys.ArrowDown) {
    player.pos += game.size;
    player.cool = player.speed; // set cooloff
  }

  const newPlace = myBoard[player.pos]; //future position
  if (newPlace.t === 1 || newPlace.t === 4) {
    player.pos = tempPos;
  }
  if (newPlace.t == 2) {
    myBoard[player.pos].innerHTML = "";
    const tempDots = document.querySelectorAll(".dot");
    if (tempDots.length === 0) {
      playerWins();
    }
    newPlace.t = 0;
    player.score++;
    updateScoreAndLives();
  }

  if (newPlace.t == 3) {
    bonusSound.play();
    player.powerCount = 100;
    player.powerUp = true;
    myBoard[player.pos].innerHTML = "";
    player.score += 10;
    updateScoreAndLives();
    newPlace.t = 0;
  }
  if (newPlace.t == 5) {
    bonusSound.play();
    addSeconds(30);
    myBoard[player.pos].innerHTML = "";
    newPlace.t = 0;
  }
  if (player.pos !== tempPos) {
    if (player.tog) {
      game.mouth.style.height = "30%";
      player.tog = false;
    } else {
      game.mouth.style.height = "10%";
      player.tog = true;
    }
  }
};
