function renderGameBoard(gameBoardObj, container, isActive) {
  container.replaceChildren();
  const boardArr = gameBoardObj.getBoardArr();
  const attackMap = gameBoardObj.getAttackMap();

  for (let i = 0; i < boardArr.length; i++) {
    const btn = document.createElement("button");
    btn.classList.add("game-tile");
    const tileStatus = attackMap.get(i);
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
    if (isActive) {
      btn.disabled = true;
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
  const index = getPlayerIndex(gameLoop);
  const winner = index === 0 ? "Player 1" : "Player 2";
  const victoryText = `${winner} has sunk all enemy battleships and won the game!`;
  container.innerText = victoryText;
}

function displayAtkStatus(container, gameBoard, plyrNum) {
  const attackMap = gameBoard.getAttackMap();
  const boardArr = gameBoard.getBoardArr();
  const lastAttack = Array.from(attackMap.entries()).pop();
  if (lastAttack[1] && boardArr[lastAttack[0]].isSunk()) {
    container.textContent += `Player ${plyrNum} has sunk an enemy battleship! `;
  } else if (lastAttack[1]) {
    container.textContent += `Player ${plyrNum} attacks! It's a hit! `;
  } else {
    container.textContent += `Player ${plyrNum} attacks! And missed! `;
  }
}

function disableGameInput() {
  const gameButtons = document.querySelectorAll(".game-tile");
  gameButtons.forEach((btn) => {
    btn.disabled = true;
  });
}

export {
  renderGameBoard,
  displayShipInfo,
  displayVictory,
  displayAtkStatus,
  disableGameInput
};
