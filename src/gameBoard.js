function createGameBoard() {
  const board = [];
  const ships = [];
  const attackedIndices = {};
  for (let i = 0; i < 100; i++) {
    board[i] = false;
  }

  const getBoardArr = () => board;

  const placeShip = (index, length, shipFn) => {
    if (
      index > 99 ||
      index < 0 ||
      Math.floor(index / 10) !== Math.floor((index + length) / 10)
    ) {
      throw new Error(
        "Horizontal ship positions cannot be placed off the board"
      );
    }
    const ship = shipFn(index, length);
    for (let i = index; i < index + length; i++) {
      board[i] = ship;
    }
    ships.push(ship);
  };

  const getAttackedIndices = () => attackedIndices;

  const receiveAttack = (index) => {
    if (attackedIndices[index] !== undefined) {
      throw new Error("Cannot attack the same tile twice");
    }
    const ship = board[index];
    if (ship) {
      ship.hit(index);
    }
    const hit = !!board[index];
    attackedIndices[index] = hit;
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    getBoardArr,
    placeShip,
    getAttackedIndices,
    receiveAttack,
    allShipsSunk
  };
}

export default createGameBoard;
