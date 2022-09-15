/**
 * @jest-environment jsdom
 */

import createGameBoard from "../gameBoard";
import initGameLoop from "../gameLoop";
import createPlayer from "../player";
import createShip from "../ships";
import {
  renderGameBoard,
  displayAttack,
  displayShipInfo,
  displayVictory,
  disableGameInput
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

test("DOM method populates gameboard element with 100 buttons", () => {
  const testContainer = createDummyDOM();
  const pBoard = testContainer.querySelector(".player1-board > .board-grid");
  expect(pBoard.querySelectorAll("button").length).toBe(0);
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  renderGameBoard(testLoop, pBoard);
  expect(pBoard.querySelectorAll("button").length).toBe(100);
});

test("Active players' boards' buttons are assigned classes based on ship placement.", () => {
  const testContainer = createDummyDOM();
  const pBoard = testContainer.querySelector(".player1-board > .board-grid");
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  renderGameBoard(testLoop, pBoard, "activePlayer");
  const plyrBoard = testLoop.getAllBoardInfo()[0];
  const boardTiles = pBoard.querySelectorAll("button");
  for (let i = 0; i < boardTiles.length; i++) {
    if (plyrBoard[i] === undefined) {
      expect(boardTiles[i].classList.contains("blank-tile")).toBe(true);
    } else if (typeof plyrBoard[i] === "object") {
      expect(boardTiles[i].classList.contains("ship-segment")).toBe(true);
    }
  }
});

test("Clicking a tile on the defending board should make an attack on that tile", () => {
  const testContainer = createDummyDOM();
  const defendingDOMBoard = testContainer.querySelector(
    ".player2-board > .board-grid"
  );

  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  renderGameBoard(testLoop, defendingDOMBoard);
  const gameButtons = defendingDOMBoard.querySelectorAll("button");
  gameButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      displayAttack(e.target, testLoop);
    })
  );

  const defendingGameBoard = testLoop.getDefendingBoard();
  const testIndex = Math.floor(Math.random() * gameButtons.length);
  const defendingTileZero =
    defendingDOMBoard.querySelectorAll("button")[testIndex];
  testLoop.takeTurn(testIndex);
  defendingTileZero.click();
  const attackedTiles = defendingGameBoard.getAttackedIndices();
  const enemyBoardArr = defendingGameBoard.getBoardArr();
  if (enemyBoardArr[testIndex] === undefined) {
    expect(attackedTiles[testIndex]).toBe(false);
  } else if (typeof enemyBoardArr[testIndex] === "object") {
    expect(attackedTiles[testIndex]).toBe(true);
  }
});

test("Buttons are disabled after they're clicked. A class is added depending on if a ship existed on that tile or not", () => {
  const testContainer = createDummyDOM();
  const defendingDOMBoard = testContainer.querySelector(
    ".player2-board > .board-grid"
  );
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  renderGameBoard(testLoop, defendingDOMBoard);
  const gameButtons = defendingDOMBoard.querySelectorAll("button");
  gameButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      displayAttack(e.target, testLoop);
    })
  );
  const testIndex = Math.floor(Math.random() * gameButtons.length);
  const randomBtn = gameButtons[testIndex];
  expect(randomBtn.disabled).toBe(false);
  randomBtn.click();
  expect(randomBtn.disabled).toBe(true);
  const hitTile = testLoop.getAllBoardInfo()[1].getAttackedIndices()[testIndex];
  if (hitTile) {
    expect(randomBtn.classList.contains("hit-ship")).toBe(true);
  } else {
    expect(randomBtn.classList.contains("missed-attack")).toBe(true);
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
  defendingBoard.receiveAttack(41);
  defendingBoard.receiveAttack(42);
  displayShipInfo(shipInfoContainer, defendingBoard);
  expect(shipInfoContainer.innerText).toBe(4);
});

test("The game stops taking input and declares a victor when the game is over", () => {
  const testContainer = createDummyDOM();
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const enemyBoard = testContainer.querySelector(
    ".player2-board > .board-grid"
  );
  renderGameBoard(testLoop, enemyBoard);
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

// test("The status of the last turn (hits, misses, sunken ships, tile attacked, and victory) is always displayed", () => {
//   const testContainer = createDummyDOM();
//   const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);

// });
