import initGameLoop from "../gameLoop";
import createGameBoard from "../gameBoard";
import createShip from "../ships";
import createPlayer from "../player";

test("The game ends once all the ships on a player's board have been sunk", () => {
  const gameLoop = initGameLoop(createGameBoard, createShip, createPlayer);
  const firstGameState = gameLoop.getGameState();
  expect(firstGameState).toBe("playing");
  const enemyBoard = gameLoop.getDefendingBoard();
  const shipIndices = enemyBoard.getShips().reduce((acc, ship) => {
    return acc.concat(ship.getShipLocation());
  }, []);
  console.log(shipIndices);
  for (let t = 0; t < shipIndices.length; t++) {
    gameLoop.takeTurn(shipIndices[t]);
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
