function createShip(startInd, length) {
  const hitIndices = [];
  const shipIndices = [];
  for (let i = 0; i < length; i++) {
    shipIndices[i] = startInd + i;
  }

  const hit = (num) => {
    const index = shipIndices.indexOf(num);
    const hitTile = shipIndices.splice(index, 1)[0];
    hitIndices.push(hitTile);
  };

  const isSunk = () => hitIndices.length === length;

  return { hit, isSunk };
}

export default createShip;
