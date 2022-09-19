/**
 * @jest-environment jsdom
 */

import createGameBoard from "../gameBoard";
import initGameLoop from "../gameLoop";
import createPlayer from "../player";
import createShip from "../ships";
import {
  renderGameBoard,
  displayShipInfo,
  displayVictory,
  disableGameInput,
  displayAtkStatus
} from "../DOMMethods";

function createDummyDOM() {
  const container = document.createElement("div");
  container.innerHTML = `
  <div class="game-ui-container">
  <div class="game-boards-container">
    <div class="player1-board">
      <p class="plyr-info">Player 1 board</p>
      <div class="board-grid"></div>
      <p>Ships left: <span class="ship-info"></span></p>
    </div>
    <div class="player2-board">
      <p class="plyr-info">Player 2 board</p>
      <div class="board-grid"></div>
      <p>Ships left: <span class="ship-info"></span></p>
    </div>
  </div>
  <div class="turn-info-container">
    <p><span class="current-player"></span>'s turn</p>
    <p class="current-turn-status"></p>
  </div>
    `;
  return container;
}

test("DOM method removes all elements and populates gameboard element with 100 buttons", () => {
  const testContainer = createDummyDOM();
  const pBoard = testContainer.querySelector(".player1-board > .board-grid");
  expect(pBoard.querySelectorAll("button").length).toBe(0);
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const plyrBoard = testLoop.getAllBoardInfo()[0];
  renderGameBoard(plyrBoard, pBoard, true);
  expect(pBoard.querySelectorAll("button").length).toBe(100);
  renderGameBoard(plyrBoard, pBoard, true);
  expect(pBoard.querySelectorAll("button").length).toBe(100);
});

test("Active players' boards' buttons are assigned classes based on ship placement.", () => {
  const testContainer = createDummyDOM();
  const pBoard = testContainer.querySelector(".player1-board > .board-grid");
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const plyrBoardObj = testLoop.getAllBoardInfo()[0];
  const plyrBoard = plyrBoardObj.getBoardArr();
  renderGameBoard(plyrBoardObj, pBoard, true);
  const boardTiles = pBoard.querySelectorAll("button");
  for (let i = 0; i < boardTiles.length; i++) {
    if (!plyrBoard[i]) {
      expect(boardTiles[i].classList.contains("blank-tile")).toBe(true);
    } else if (typeof plyrBoard[i] === "object") {
      expect(boardTiles[i].classList.contains("ship-segment")).toBe(true);
    }
  }
});

test("The game will always display how many ships a player has remaining.", () => {
  const testContainer = createDummyDOM();
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const defendingBoard = testLoop.getDefendingBoard();
  const shipInfoContainer = testContainer.querySelector(
    ".player2-board .ship-info"
  );
  displayShipInfo(shipInfoContainer, defendingBoard);
  expect(shipInfoContainer.innerText).toBe(5);
  defendingBoard.receiveAttack("41");
  defendingBoard.receiveAttack("42");
  displayShipInfo(shipInfoContainer, defendingBoard);
  expect(shipInfoContainer.innerText).toBe(4);
});

test("The game stops taking input and declares a victor when the game is over", () => {
  const testContainer = createDummyDOM();
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const enemyBoardObj = testLoop.getDefendingBoard();
  const enemyBoard = testContainer.querySelector(
    ".player2-board > .board-grid"
  );
  renderGameBoard(enemyBoardObj, enemyBoard);
  const enemyBtns = Array.from(enemyBoard.querySelectorAll("button"));
  const gameStatus = testContainer.querySelector(".current-turn-status");
  const enemyShips = testLoop.getDefendingBoard().getShips();

  expect(enemyBtns.every((btn) => !btn.disabled));
  const enemyShipLocations = enemyShips.reduce((acc, ship) => {
    return acc.concat(ship.getShipLocation());
  }, []);
  enemyShipLocations.forEach((index) => {
    testLoop.takeTurn(index);
  });
  displayVictory(gameStatus, testLoop);
  disableGameInput(enemyBoard);
  expect(gameStatus.innerText).toBe(
    "Player 1 has sunk all enemy battleships and won the game!"
  );
  expect(enemyBtns.every((btn) => btn.disabled));
});

test("The game displays the status of the most recent turn", () => {
  const testContainer = createDummyDOM();
  const statContainer = testContainer.querySelector(".current-turn-status");
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const enemyBoard = testLoop.getDefendingBoard();
  const enemyBoardArr = enemyBoard.getBoardArr();
  const enemyAttackMap = enemyBoard.getAttackMap();
  const index = Math.floor(Math.random() * enemyBoardArr.length).toString();
  enemyBoard.receiveAttack(index);
  displayAtkStatus(statContainer, enemyBoard, 1);
  if (enemyAttackMap.get(index) === false) {
    expect(statContainer.textContent).toMatch("Player 1 attacks! And missed!");
  } else if (enemyAttackMap.get(index) && enemyBoardArr[index].isSunk()) {
    expect(statContainer.textContent).toMatch(
      "Player 1 has sunk an enemy battleship!"
    );
  } else {
    expect(statContainer.textContent).toMatch("Player 1 attacks! It's a hit!");
  }
});
