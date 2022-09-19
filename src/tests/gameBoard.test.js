import createShip from "../ships";
import createGameBoard from "../gameBoard";

test("Gameboard can place ships at specific indices.", () => {
  const testBoard = createGameBoard();
  const board = testBoard.getBoardArr();
  expect(board[13]).toBe(false);
  testBoard.placeShip(13, 2, createShip);
  expect(board[13]).toEqual(expect.any(Object));
});

test("Ships cannot overlap each other or have any indices placed off the board", () => {
  const testBoard = createGameBoard();
  expect(() => {
    testBoard.placeShip(101, 1, createShip);
  }).toThrow(/Horizontal ship positions cannot be placed off the board/);
  expect(() => {
    testBoard.placeShip(19, 3, createShip);
  }).toThrow(/Horizontal ship positions cannot be placed off the board/);
});

test("Gameboard can receive attacks and determine whether a ship was hit or not", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip(4, 3, createShip);
  testBoard.placeShip(14, 2, createShip);
  const testShip1 = testBoard.getBoardArr()[4];
  const testShip2 = testBoard.getBoardArr()[14];
  const shipSpy1 = jest.spyOn(testShip1, "hit");
  const shipSpy2 = jest.spyOn(testShip2, "hit");

  testBoard.receiveAttack(0);
  expect(shipSpy1).not.toBeCalled();
  expect(shipSpy2).not.toBeCalled();

  testBoard.receiveAttack(4);
  expect(shipSpy1).toBeCalled();
  expect(shipSpy2).not.toBeCalled();
  shipSpy1.mockClear();

  testBoard.receiveAttack(15);
  expect(shipSpy1).not.toBeCalled();
  expect(shipSpy2).toBeCalled();
});

test("Gameboard logs all successful and unsuccessful attacks a player makes", () => {
  const testBoard = createGameBoard();
  const attackMap = testBoard.getAttackMap();
  expect(attackMap.get(80)).toEqual(undefined);
  testBoard.receiveAttack(80);
  expect(attackMap.get(80)).toEqual(false);
  testBoard.placeShip(50, 2, createShip);
  testBoard.receiveAttack(51);
  expect(attackMap.get(51)).toEqual(true);
});

test("Players cannot attack a tile that has been previously attacked", () => {
  const testBoard = createGameBoard();
  testBoard.receiveAttack(10);
  expect(() => {
    testBoard.receiveAttack(10);
  }).toThrow(/Cannot attack the same tile twice/);
});

test("Gameboard can tell when all of its ships have been sunk.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip(21, 2, createShip);
  expect(testBoard.allShipsSunk()).toBe(false);
  testBoard.receiveAttack(21);
  expect(testBoard.allShipsSunk()).toBe(false);
  testBoard.receiveAttack(22);
  expect(testBoard.allShipsSunk()).toBe(true);
});
