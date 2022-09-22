function horizontalAlign(start, length, arr) {
  for (let i = 0; i < length; i++) {
    arr[i] = start + i;
  }
}

function verticalAlign(start, length, arr) {
  for (let i = 0; i < length; i++) {
    arr[i] = start + i * 10;
  }
}

function createShip(startInd, length, alignment) {
  const hitIndices = [];
  const shipIndices = [];

  if (alignment === "horizontal") {
    horizontalAlign(startInd, length, shipIndices);
  } else if (alignment === "vertical") {
    verticalAlign(startInd, length, shipIndices);
  }

  const getShipLocation = () => shipIndices;

  const hit = (num) => {
    const index = shipIndices.indexOf(num);
    const hitTile = shipIndices.splice(index, 1)[0];
    hitIndices.push(hitTile);
  };

  const getAlignment = () => alignment;

  const isSunk = () => hitIndices.length === length;
  return { hit, isSunk, getShipLocation, getAlignment };
}

export default createShip;
