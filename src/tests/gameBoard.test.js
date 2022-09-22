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
  }).toThrow(/Ship positions cannot be placed off the board/);
});

test("Gameboard can place ships at random indices without overlapping or placing ships off the board", () => {
  const testBoard = createGameBoard();
  testBoard.randomPlacement(4, createShip);
  testBoard.randomPlacement(4, createShip);
  testBoard.randomPlacement(4, createShip);
  testBoard.randomPlacement(4, createShip);
  testBoard.randomPlacement(4, createShip);
  const shipPlacements = testBoard.getShips();
  expect(shipPlacements.length).not.toBe(0);
  const shipMap = new Map();
  for (let i = 0; i < shipPlacements.length; i++) {
    shipMap.set(i, shipPlacements[i]);
  }
  expect(shipPlacements.length).toBe(shipMap.size);
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

test("Ships can change alignment as long as they remain on the board and don't overlap anything.", () => {
  const testBoard = createGameBoard();
  testBoard.placeShip(1, 5, createShip, "horizontal");
  testBoard.swapShipAlign(testBoard.getShips()[0], createShip);
  expect(testBoard.getShips()[0].getShipLocation()).toEqual([
    1, 11, 21, 31, 41
  ]);
  expect(testBoard.getBoardArr()[2]).toBe(false);
  testBoard.placeShip(9, 3, createShip, "vertical");
  testBoard.swapShipAlign(testBoard.getShips()[1], createShip);
  expect(testBoard.getShips()[1].getShipLocation()).toEqual([9, 19, 29]);
  testBoard.placeShip(30, 2, createShip, "vertical");
  testBoard.swapShipAlign(testBoard.getShips()[2], createShip);
  expect(testBoard.getShips()[2].getShipLocation()).toEqual([30, 40]);
});
