import createShip from "../ships";
import createGameBoard from "../gameBoard";

test("Gameboard receives valid index and places ship at that index", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([1, 3], createShip, 4);
  expect(testBoard.getShips().length).toBe(1);
});

test("Gameboard receives invalid index. Fails to place ship", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([11, 4], createShip, 4);
  expect(testBoard.getShips().length).toBe(0);
});
