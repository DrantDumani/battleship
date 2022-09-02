function createShip(startInd, length = 4) {
  const shipArr = [];
  for (let i = 0; i < length; i++) {
    shipArr[i] = startInd + i;
  }

  const hit = (num) => {
    const index = shipArr.indexOf(num);
    if (index === -1) {
      return false;
    }
    shipArr[index] = "hit";
    return true;
  };

  const isSunk = () => shipArr.every((el) => el === "hit");
  return { hit, isSunk };
}

export default createShip;
