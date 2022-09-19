import createShip from "./ships";
import createGameBoard from "./gameBoard";
import createPlayer from "./player";
import initGameLoop from "./gameLoop";
import {
  renderGameBoard,
  disableGameInput,
  displayShipInfo,
  displayVictory,
  displayAtkStatus
} from "./DOMMethods";
import "./style.scss";

const p1Board = document.querySelector(".player1-board > .board-grid");
const p2Board = document.querySelector(".player2-board > .board-grid");
const mainGameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
beginGame(mainGameLoop);

function renderPlayerBoards(boardInfo) {
  renderGameBoard(boardInfo[0], p1Board, true);
  renderGameBoard(boardInfo[1], p2Board);
}

function displayPlayerShipInfo(boardInfo) {
  const p1ShipInfo = document.querySelector(".player1-board .ship-info");
  const p2ShipInfo = document.querySelector(".player2-board .ship-info");
  displayShipInfo(p1ShipInfo, boardInfo[0]);
  displayShipInfo(p2ShipInfo, boardInfo[1]);
}

function displayTurnInfo(gameBoardInfo) {
  const container = document.querySelector(".current-turn-status");
  container.textContent = "";
  displayAtkStatus(container, gameBoardInfo[1], 1);
  displayAtkStatus(container, gameBoardInfo[0], 2);
}

// CPU game only
function handleClick(target, gameLoop) {
  const index = target.dataset.index;
  gameLoop.takeTurn(index);
  const boardInfo = gameLoop.getAllBoardInfo();
  renderPlayerBoards(boardInfo);
  displayPlayerShipInfo(boardInfo);
  displayTurnInfo(boardInfo);
  if (gameLoop.getGameState() === "game over") {
    const statusContainer = document.querySelector(".current-turn-status");
    displayVictory(statusContainer, mainGameLoop);
    disableGameInput();
  }
}

// use event delegation

document.body.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.classList.contains("game-tile")) {
    handleClick(e.target, mainGameLoop);
  }
});

function beginGame(gameLoop) {
  const boardInfo = gameLoop.getAllBoardInfo();
  renderPlayerBoards(boardInfo);
  displayPlayerShipInfo(boardInfo);
}
