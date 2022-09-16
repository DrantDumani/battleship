import createShip from "./ships";
import createGameBoard from "./gameBoard";
import createPlayer from "./player";
import initGameLoop from "./gameLoop";
import {
  renderGameBoard,
  disableGameInput,
  displayShipInfo,
  displayVictory
} from "./DOMMethods";
import "./style.scss";

const p1Board = document.querySelector(".player1-board > .board-grid");
const p2Board = document.querySelector(".player2-board > .board-grid");

const mainGameLoop = initGameLoop(createGameBoard, createShip, createPlayer);

function beginGame(gameLoop) {
  renderGameBoard(gameLoop.getAllBoardInfo()[0], p1Board, true);
  renderGameBoard(gameLoop.getAllBoardInfo()[1], p2Board);
}

beginGame(mainGameLoop);
