// const findDirection = (a) => {
//   const val = [a.pos % game.size, Math.ceil(a.pos / game.size)]; // col and row
//   return val;
// };
const startPos = () => {
  player.pause = false;
  const firstStartPos = 20;
  player.pos = startPosPlayer(firstStartPos);
  myBoard[player.pos].append(game.player);
  ghosts.forEach((ghost, i) => {
    ghost.pos = startPosPlayer(game.startGhost[i]);

    myBoard[ghost.pos].append(ghost);
  });
};
const startPosPlayer = (val) => {
  if (myBoard[val].t !== 1) {
    return val;
  }

  return startPosPlayer(val + 1);
};
