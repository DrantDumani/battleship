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

test("If applicable, the CPU will make a random move on their turn. The turn then passes to the human player", () => {
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
