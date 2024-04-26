//@ts-nocheck
// const changeDirection = (ghost) => {
//   const ghostPos = findDirection(ghost);
//   const playerPos = findDirection(player);
//   const ran = Math.floor(Math.random() * 10);
//   if (ran === 0) {
//     ghost.dx = ghostPos[0] < playerPos[0] ? 2 : 3;
//   } else {
//     ghost.dx = ghostPos[1] < playerPos[1] ? 1 : 0;
//   }

//   ghost.counter = Math.random() * 5 + 2;
// };
function findDirection(ghost) {
  let directions = [];
  let seesPlayer = false;
  const offsets = [-game.size, game.size, 1, -1];
  const oppositeDirections = {0: 1, 1: 0, 2: 3, 3: 2};

  offsets.forEach((offset, index) => {
    // if the next tile is a wall, the ghost cannot move in that direction
    if (myBoard[ghost.pos + offset].t !== 1) directions.push(index);

    // if the ghost sees the player within 10 tiles, it will move towards the player
    for (let i = 0; i <= 10; i++) {
      if (myBoard[ghost.pos + offset * i].t === 1) break;
      if (ghost.pos + offset * i === player.pos) {
        if (player.powerUp) { 
          directions.filter(d => d !== index); 
        } else { 
          ghost.dx = index;
          seesPlayer = true;
        }
        break;
      }
    }
  });

  // if the ghost is at a junction, it will not turn back
  if (!seesPlayer) {
    if (directions.length > 1) {
      const oppositeDirection = oppositeDirections[ghost.dx];
      const index = directions.indexOf(oppositeDirection);
      if (index !== -1) {
        directions.splice(index, 1);
      }
      ghost.dx = directions[Math.floor(Math.random() * directions.length)];
    } else if (directions.length === 1) {
      ghost.dx = directions[0];
    }
  }
}

const createGhost = () => {
  const newGhost = game.ghost.cloneNode(true);
  newGhost.pos = game.startGhost;
  newGhost.style.display = "block";
  newGhost.counter = 0;
  newGhost.defaultColor = board[ghosts.length];
  newGhost.dx = Math.floor(Math.random() * 4);
  newGhost.style.backgroundColor = board[ghosts.length];
  newGhost.style.opacity = "0.8";
  newGhost.name = board[ghosts.length] + "y";
  ghosts.push(newGhost);
};
