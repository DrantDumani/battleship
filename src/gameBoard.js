function createGameBoard() {
  const board = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      board[y] = x;
    }
  }

  const oneDimIndex = (y, x) => y * 10 + x;

  const placeShip = (coords, fn, len = 4) => {
    const [y, x] = coords;
    if (x > 9 || y > 9) {
      throw new Error("Index out of bounds");
    }
    const index = oneDimIndex(y, x);
    gameBoardShips.push(fn(index, len));
  };

  const gameBoardShips = [];
  const getShips = () => gameBoardShips;

  const attackedTiles = [];
  const getAttackedTiles = () => attackedTiles;

  const receiveAttack = (coord) => {
    const [y, x] = coord;
    const index = oneDimIndex(y, x);
    if (attackedTiles.includes(index)) {
      return;
    }
    attackedTiles.push(index);
    for (const ship of gameBoardShips) {
      if (ship.hit(index)) {
        return true;
      }
    }
    return false;
  };

  const allShipsSunk = () => {
    const shipStatuses = gameBoardShips.map((ship) => ship.isSunk());
    return shipStatuses.every((status) => status === true);
  };

  return { placeShip, getShips, receiveAttack, allShipsSunk, getAttackedTiles };
}

export default createGameBoard;
