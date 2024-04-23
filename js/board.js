//@ts-nocheck

const drawBoard = (val) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.add("box");
  if (val === 1) {
    img.src = "img/tile-bush.png";
    img.classList.add("wall");
    div.appendChild(img);
  }
  if (val === 2) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    div.append(dot);
  }
  if (val === 3) {
    const dot = document.createElement("div");
    dot.classList.add("superdot");
    div.append(dot);
  }
  if (val === 4) {
    div.classList.add("hideout");

    game.startGhost.push(myBoard.length);
  }
  if (val === 5) {
    const dot = document.createElement("div");
    dot.classList.add("extraTime");
    div.append(dot);
  }
  game.grid.append(div);
  myBoard.push(div);
  div.t = val;
  div.idVal = myBoard.length;
};
