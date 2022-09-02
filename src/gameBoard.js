function createGameBoard() {
  const board = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      board[y] = x;
    }
  }

  const placeShip = (coords, fn, len = 4) => {
    const [y, x] = coords;
    if (x > 9 || y > 9) {
      return "Index out of bounds";
    }
    const index = y * 10 + x;
    gameBoardShips.push(fn(index, len));
  };

  const gameBoardShips = [];

  const getShips = () => gameBoardShips;

  return { placeShip, getShips };
}

export default createGameBoard;
