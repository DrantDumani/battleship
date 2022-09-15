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

function displayAttack(elem, gameLoop) {
  elem.classList.remove("blank-tile");
  const defendingBoard = gameLoop.getDefendingBoard();
  const index = Number(elem.dataset.index);
  const attackStatus = defendingBoard.getAttackedIndices()[index];
  if (attackStatus) {
    elem.classList.add("hit-ship");
  } else {
    elem.classList.add("missed-attack");
  }
  elem.disabled = true;
}

function displayShipInfo(container, gameBoard) {
  const shipNum = gameBoard.getShips().filter((ship) => !ship.isSunk()).length;
  container.innerText = shipNum;
}

function getPlayerIndex(gameLoop) {
  const currentPlayer = gameLoop.getCurrentPlayer();
  const plyrIndex = gameLoop.getAllPlyrInfo().indexOf(currentPlayer);
  return plyrIndex;
}

function displayVictory(container, gameLoop) {
  const index = getPlayerIndex(gameLoop);
  const winner = index === 0 ? "Player 1" : "Player 2";
  const victoryText = `${winner} has sunk all enemy battleships and won the game!`;
  container.innerText = victoryText;
}

function disableGameInput(gameBoard) {
  const gameButtons = gameBoard.querySelectorAll("buttons");
  gameButtons.forEach((btn) => {
    btn.disabled = true;
  });
}

export {
  renderGameBoard,
  displayAttack,
  displayShipInfo,
  displayVictory,
  disableGameInput
};
