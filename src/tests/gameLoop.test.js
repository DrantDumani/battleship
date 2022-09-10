import initGameLoop from "../gameLoop";
import createGameBoard from "../gameBoard";
import createShip from "../ships";
import createPlayer from "../player";

test("The game ends once all the ships on a player's board have been sunk", () => {
  const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const firstGameState = gameLoop.getGameState();
  expect(firstGameState).toBe("playing");
  const shipIndices = [
    1, 2, 3, 4, 5, 11, 12, 13, 14, 21, 22, 23, 31, 32, 33, 41, 42
  ];
  const misses = [
    99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83
  ];
  for (let t = 0; t < misses.length; t++) {
    gameLoop.takeTurn(shipIndices[t]);
    gameLoop.takeTurn(misses[t]);
  }
  const secondGameState = gameLoop.getGameState();
  expect(secondGameState).toBe("game over");
});

test("If applicable, the CPU will make a random on their turn. The turn then passes to the human player", () => {
  const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const cpuPlayer = gameLoop.getAllPlyrInfo()[1];
  expect(cpuPlayer.type).toBe("CPU");
  const CPUspy = jest.spyOn(cpuPlayer, "randomAttack");
  expect(CPUspy).toHaveBeenCalledTimes(0);
  gameLoop.takeTurn(4);
  expect(CPUspy).toHaveBeenCalledTimes(1);
  gameLoop.takeTurn(50);
  expect(CPUspy).toHaveBeenCalledTimes(2);
});

// test("Current player swaps every turn", () => {
//     const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
//     const plyrTurn1 = gameLoop.getCurrentPlayer();
//     gameLoop.takeTurn(0);
//     const plyrTurn2 = gameLoop.getCurrentPlayer();
//     expect(plyrTurn1).not.toBe(plyrTurn2);
//     gameLoop.takeTurn(5);
//     const plyrTurn3 = gameLoop.getCurrentPlayer();
//     expect(plyrTurn1).toBe(plyrTurn3);
//     gameLoop.takeTurn(10);
//     const plyrTurn4 = gameLoop.getCurrentPlayer();
//     expect(plyrTurn2).toBe(plyrTurn4);
//   });

//   test("Defending board swaps every turn once it is attacked", () => {
//     const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
//     const boardTurn1 = gameLoop.getDefendingBoard();
//     gameLoop.takeTurn(99);
//     const boardTurn2 = gameLoop.getDefendingBoard();
//     expect(boardTurn1).not.toBe(boardTurn2);
//     expect(boardTurn1.getAttackedIndices()).toEqual({ 99: false });
//     expect(boardTurn2.getAttackedIndices()).toEqual({});
//     gameLoop.takeTurn(90);
//     const boardTurn3 = gameLoop.getDefendingBoard();
//     expect(boardTurn1).toBe(boardTurn3);
//     expect(boardTurn1.getAttackedIndices()).toEqual({ 99: false });
//     expect(boardTurn2.getAttackedIndices()).toEqual({ 90: false });
//     gameLoop.takeTurn(80);
//     const boardTurn4 = gameLoop.getDefendingBoard();
//     expect(boardTurn2).toBe(boardTurn4);
//     expect(boardTurn1.getAttackedIndices()).toEqual({ 99: false, 80: false });
//     expect(boardTurn2.getAttackedIndices()).toEqual({ 90: false });
//   });
