function renderGameBoard(gameLoop, container, type) {
  const plyrBoard = gameLoop.getAllBoardInfo()[0];

  for (let i = 0; i < 100; i++) {
    const btn = document.createElement("button");
    btn.classList.add("game-tile");
    if (plyrBoard[i] === undefined) {
      btn.classList.add("blank-tile");
    } else if (type === "activePlayer") {
      btn.classList.add("ship-segment");
    }
    btn.dataset.index = i;
    container.append(btn);
  }
}

function handleClick(elem, gameLoop) {
  const defendingBoard = gameLoop.getDefendingBoard();
  const index = Number(elem.dataset.index);
  defendingBoard.receiveAttack(index);
  elem.disabled = true;
}

export { renderGameBoard, handleClick };
