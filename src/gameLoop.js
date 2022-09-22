function initGameLoop(boardFn, shipFn, plyrFn) {
  const plyr1 = plyrFn();
  const plyr2 = plyrFn("CPU");

  let gameState = "playing";
  const getGameState = () => gameState;

  let currentPlayer = plyr1;
  const getCurrentPlayer = () => currentPlayer;
  const setCurrentPlayer = () => {
    currentPlayer = currentPlayer === plyr1 ? plyr2 : plyr1;
  };
  const getAllPlyrInfo = () => [plyr1, plyr2];

  const plyr1Board = boardFn();
  const plyr2Board = boardFn();

  let defendingBoard = plyr2Board;
  const getDefendingBoard = () => defendingBoard;
  const setDefendingBoard = () => {
    defendingBoard = defendingBoard === plyr1Board ? plyr2Board : plyr1Board;
  };
  const getAllBoardInfo = () => [plyr1Board, plyr2Board];

  // const setShips = [
  //   { length: 5, index: 1 },
  //   { length: 4, index: 11 },
  //   { length: 3, index: 21 },
  //   { length: 3, index: 31 },
  //   { length: 2, index: 41 }
  // ];

  // for (const ship of setShips) {
  //   const { length, index } = ship;
  //   plyr1Board.placeShip(index, length, shipFn);
  //   plyr2Board.placeShip(index, length, shipFn);
  // }

  const shipLengths = [5, 4, 3, 3, 2];
  for (const length of shipLengths) {
    plyr1Board.randomPlacement(length, shipFn);
    plyr2Board.randomPlacement(length, shipFn);
  }

  const takeCPUTurn = () => {
    const attack = currentPlayer.randomAttack();
    defendingBoard.receiveAttack(attack);
    if (checkGameOver()) {
      gameState = "game over";
      return;
    }
    setCurrentPlayer();
    setDefendingBoard();
  };

  const takeTurn = (index) => {
    defendingBoard.receiveAttack(index);
    if (checkGameOver()) {
      gameState = "game over";
      return;
    }
    setCurrentPlayer();
    setDefendingBoard();
    if (currentPlayer.type === "CPU") {
      takeCPUTurn();
    }
  };

  const checkGameOver = () => defendingBoard.allShipsSunk();

  return {
    takeTurn,
    getCurrentPlayer,
    getDefendingBoard,
    getGameState,
    getAllPlyrInfo,
    getAllBoardInfo
  };
}

export default initGameLoop;
