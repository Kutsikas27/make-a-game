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
function changeDirection(ghost) {
  ghost.dx = Math.floor(Math.random() * 4);
  ghost.counter = Math.random() * 3;
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
