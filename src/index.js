import createShip from "./ships";
import createGameBoard from "./gameBoard";
import createPlayer from "./player";
import initGameLoop from "./gameLoop";
import { renderGameBoard, handleClick } from "./DOMMethods";
import "./style.scss";

const p1Board = document.querySelector(".player1-board > .board-grid");
const p2Board = document.querySelector(".player2-board > .board-grid");

const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);

renderGameBoard(gameLoop, p1Board, "activePlayer");
renderGameBoard(gameLoop, p2Board);
const allGameTiles = document.querySelectorAll(".game-tile");
allGameTiles.forEach((btn) => {
  addEventListener("click", (e) => {
    handleClick(e.target, gameLoop);
  });
});
