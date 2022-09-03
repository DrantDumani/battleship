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

test("Gameboard receives attack coords and hits ship.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 4);
  expect(testBoard.receiveAttack([9, 6])).toBe(true);
});

test("Gameboard receives attack coords and misses every ship.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 4);
  expect(testBoard.receiveAttack([9, 8])).toBe(false);
});

test("Gameboard checks to make sure all ships have been sunk", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 1);
  testBoard.receiveAttack([9, 4]);
  expect(testBoard.allShipsSunk()).toBe(true);
});

test("Gameboard checks to make sure all ships have been sunk", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 1);
  testBoard.placeShip([5, 4], createShip, 4);
  testBoard.receiveAttack([9, 4]);
  expect(testBoard.allShipsSunk()).toBe(false);
});

test("Make sure that Gameboard is recording previously attacked tiles", () => {
  const testBoard = createGameBoard();
  testBoard.receiveAttack([8, 2]);
  testBoard.receiveAttack([9, 6]);
  testBoard.receiveAttack([0, 7]);
  expect(testBoard.getAttackedTiles()).toEqual([82, 96, 7]);
});
