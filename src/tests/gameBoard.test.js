import createShip from "../ships";
import createGameBoard from "../gameBoard";

test("Gameboard receives valid index and places ship on the board", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([0, 3], createShip, 4);

  expect(testBoard.getShips().length).toBe(1);
});

test("Gameboard receives invalid index and throws an error", () => {
  const testBoard = createGameBoard();
  expect(() => {
    testBoard.placeShip([11, 4], createShip, 4);
  }).toThrow();
});

test("Gameboard receives attack coords and hits a ship.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 4);
  expect(testBoard.receiveAttack([9, 6])).toBe(true);
});

test("Gameboard receives attack coords and misses every ship.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 4);
  testBoard.placeShip([3, 7], createShip, 2);
  expect(testBoard.receiveAttack([9, 8])).toBe(false);
});

test("Gameboard sees that all ships have been sunk", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip([9, 4], createShip, 1);
  testBoard.receiveAttack([9, 4]);
  expect(testBoard.allShipsSunk()).toBe(true);
});

test("Gameboard checks for sunken ships and sees that some of them haven't sunk yet.", () => {
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

test("Gameboard does not allow you to attack the same tile more than once", () => {
  const testBoard = createGameBoard();
  testBoard.receiveAttack([5, 4]);
  testBoard.receiveAttack([5, 4]);
  testBoard.receiveAttack([5, 4]);
  expect(testBoard.getAttackedTiles()).toEqual([54]);
});
