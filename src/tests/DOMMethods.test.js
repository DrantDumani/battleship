/**
 * @jest-environment jsdom
 */

import createGameBoard from "../gameBoard";
import initGameLoop from "../gameLoop";
import createPlayer from "../player";
import createShip from "../ships";
import { renderGameBoard, handleClick } from "../DOMMethods";

function createDummyDOM() {
  const container = document.createElement("div");
  container.innerHTML = `
      <div class="player1-board">
        <div class="board-grid">
      </div>
      <div class="player2-board">
        <div class="board-grid">
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
      handleClick(e.target, testLoop);
    })
  );

  const defendingGameBoard = testLoop.getDefendingBoard();
  const testIndex = Math.floor(Math.random() * gameButtons.length);
  const attackSpy = jest.spyOn(defendingGameBoard, "receiveAttack");
  const defendingTileZero =
    defendingDOMBoard.querySelectorAll("button")[testIndex];
  defendingTileZero.click();
  expect(attackSpy).toBeCalledWith(testIndex);
  const attackedTiles = defendingGameBoard.getAttackedIndices();
  const enemyBoardArr = defendingGameBoard.getBoardArr();
  if (enemyBoardArr[testIndex] === undefined) {
    expect(attackedTiles[testIndex]).toBe(false);
  } else if (typeof enemyBoardArr[testIndex] === "object") {
    expect(attackedTiles[testIndex]).toBe(true);
  }
});

test("Buttons are disabled after they're clicked", () => {
  const testContainer = createDummyDOM();
  const defendingDOMBoard = testContainer.querySelector(
    ".player2-board > .board-grid"
  );
  const testLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  renderGameBoard(testLoop, defendingDOMBoard);
  const gameButtons = defendingDOMBoard.querySelectorAll("button");
  gameButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      handleClick(e.target, testLoop);
    })
  );
  const testIndex = Math.floor(Math.random() * gameButtons.length);
  const randomBtn = gameButtons[testIndex];
  expect(randomBtn.disabled).toBe(false);
  randomBtn.click();
  expect(randomBtn.disabled).toBe(true);
});

test("");
