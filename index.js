//@ts-nocheck

const board = ["pink", "blue", "green"];
const myBoard = [];
const ghosts = [];
const game = {
  x: "",
  y: "",
  h: 30,
  size: 32,
  ghosts: 2,
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
  if (!game.inplay && !player.pause) {
    player.play = requestAnimationFrame(move);
    game.inplay = true;
  }
});

startGameBtn.addEventListener("click", startGame);

document.addEventListener("keyup", (e) => {
  if (e.code in keys) {
    keys[e.code] = false;
  }
});

const move = () => {
  if (game.inplay) {
    player.cool--; //player cooldown slowdown
    if (player.cool < 0) {
      //powerup
      let tempPower = 0;
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
          console.log("power down");
          tempPower = 1;
        }
      }
      //placing movement of ghosts
      ghosts.forEach((ghost, i) => {
        if (tempPower === 1) {
          ghost.style.backgroundColor = ghost.defaultColor;
        } else if (player.powerCount > 0) {
          if (player.powerCount % 2) {
            ghost.style.backgroundColor = "white";
          } else {
            ghost.style.backgroundColor = "blue";
          }
        }
        myBoard[ghost.pos].append(ghost);
        ghost.counter--;
        let oldPos = ghost.pos; //original ghost position
        if (ghost.counter <= 0) {
          changeDirection(ghost);
        } else {
          if (ghost.dx == 0) {
            ghost.pos -= game.size;
          } else if (ghost.dx == 1) {
            ghost.pos += game.size;
          } else if (ghost.dx == 2) {
            ghost.pos += 1;
          } else if (ghost.dx == 3) {
            ghost.pos -= 1;
          }
        }

        if (player.pos === ghost.pos) {
          if (player.powerCount > 0) {
            player.score += 100;

            ghost.pos = game.startGhost[i];
          } else {
            player.lives--;
            updateScoreAndLives();
            gameReset();
          }
        }
        let valGhost = myBoard[ghost.pos]; //future of ghost pos
        if (valGhost.t == 1) {
          ghost.pos = oldPos;
          changeDirection(ghost);
        }

        myBoard[ghost.pos].append(ghost);
      });
      //Keyboard events movement of player
      let tempPos = player.pos; //current pos
      if (keys.ArrowRight) {
        player.pos += 1;
        game.eye.style.left = "20%";
        game.mouth.style.left = "60%";
      } else if (keys.ArrowLeft) {
        player.pos -= 1;
        game.eye.style.left = "60%";
        game.mouth.style.left = "0%";
      } else if (keys.ArrowUp) {
        player.pos -= game.size;
      } else if (keys.ArrowDown) {
        player.pos += game.size;
      }
      let newPlace = myBoard[player.pos]; //future position
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
        player.powerCount = 100;
        player.powerUp = true;
        myBoard[player.pos].innerHTML = "";
        player.score += 10;
        updateScoreAndLives();
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
      player.cool = player.speed; // set cooloff
    }
    if (!player.pause) {
      myBoard[player.pos].append(game.player);
      player.play = requestAnimationFrame(move);
    }
  }
};
