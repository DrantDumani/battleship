function renderGameBoard(gameBoardObj, container, isActive) {
  container.replaceChildren();
  const boardArr = gameBoardObj.getBoardArr();
  const attackedIndices = gameBoardObj.getAttackedIndices();

  for (let i = 0; i < boardArr.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("game-tile");
    const tileStatus = attackedIndices[i];
    switch (tileStatus) {
      case true:
        if (boardArr[i].isSunk()) {
          btn.classList.add("sunken-ship");
        } else {
          btn.classList.add("hit-ship");
        }
        btn.disabled = true;
        break;
      case false:
        btn.classList.add("missed-attack");
        btn.disabled = true;
        break;
      case undefined:
        if (isActive && boardArr[i]) {
          btn.classList.add("ship-segment");
        } else {
          btn.classList.add("blank-tile");
        }
    }
    btn.dataset.index = i;
    container.append(btn);
  }
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
  const gameState = gameLoop.getGameState();
  if (gameState !== "game over") {
    return;
  }
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

export { renderGameBoard, displayShipInfo, displayVictory, disableGameInput };
