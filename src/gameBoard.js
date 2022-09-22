function createGameBoard() {
  const board = [];
  const ships = [];
  const attackMap = new Map();
  for (let i = 0; i < 100; i++) {
    board[i] = false;
  }

  const getBoardArr = () => board;
  const getShips = () => ships;

  const mapShipToBoard = (ship) => {
    const shipIndices = ship.getShipLocation();
    for (const index of shipIndices) {
      board[index] = ship;
    }
  };

  const placeShip = (index, length, shipFn, alignment = "horizontal") => {
    if (index > 99 || index < 0) {
      throw new Error(
        `Ship positions cannot be placed off the board. Index: ${index} Length: ${length} Alignment: ${alignment}`
      );
    }
    const ship = shipFn(index, length, alignment);
    // const shipIndices = ship.getShipLocation();
    // for (const index of shipIndices) {
    //   board[index] = ship;
    // }
    mapShipToBoard(ship);
    ships.push(ship);
  };

  const testHorizontal = (num, length) => {
    const testArr = [];
    for (let i = 0; i < length; i++) {
      testArr.push(num + i);
    }
    return (
      testArr.every((el) => board[el] === false) &&
      Math.floor(num / 10) === Math.floor((num + length - 1) / 10)
    );
  };

  const testVertical = (num, length) => {
    const testArr = [];
    for (let i = 0; i < length; i++) {
      testArr.push(num + i * 10);
    }
    return testArr.every((el) => board[el] === false) && num + length * 10 < 99;
  };

  const randomPlacement = (length, shipFn) => {
    const randomPool = Array(100)
      .fill()
      .map((_, i) => i);
    const alignments = ["horizontal", "vertical"];
    const randomAlign = Math.floor(Math.random() * alignments.length);
    const chosenAlign = alignments[randomAlign];
    let availableIndices = [];
    let randomShipIndex;
    if (chosenAlign === "horizontal") {
      availableIndices = randomPool.filter((index) =>
        testHorizontal(index, length)
      );
      randomShipIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else if (chosenAlign === "vertical") {
      availableIndices = randomPool.filter((index) =>
        testVertical(index, length)
      );
      randomShipIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
    placeShip(randomShipIndex, length, shipFn, chosenAlign);
  };

  const getAttackMap = () => attackMap;

  const receiveAttack = (index) => {
    if (attackMap.get(index) !== undefined) {
      throw new Error("Cannot attack the same tile twice");
    }
    const ship = board[index];
    if (ship) {
      ship.hit(index);
    }
    const hit = !!board[index];
    attackMap.set(index, hit);
  };

  const removeShip = (shipLocation, shipLength) => {
    for (let i = 0; i < shipLength; i++) {
      board[shipLocation[i]] = false;
    }
  };

  const swapShipAlign = (ship, shipFn) => {
    const newAlign =
      ship.getAlignment() === "horizontal" ? "vertical" : "horizontal";
    const shipLocation = ship.getShipLocation();
    const length = shipLocation.length;
    const shipBow = shipLocation[0];
    removeShip(shipLocation, length);
    if (
      (newAlign === "vertical" && !testVertical(shipBow, length)) ||
      (newAlign === "horizontal" && !testHorizontal(shipBow, length))
    ) {
      mapShipToBoard(ship);
      return;
    }
    const shipIndex = ships.indexOf(ship);
    ships.splice(shipIndex, 1);

    placeShip(shipBow, length, shipFn, newAlign);
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    getBoardArr,
    getShips,
    placeShip,
    randomPlacement,
    getAttackMap,
    receiveAttack,
    swapShipAlign,
    allShipsSunk
  };
}

export default createGameBoard;
