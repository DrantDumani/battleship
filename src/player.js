function createPlayer(str) {
  const type = str;
  if (str === "CPU") {
    const availableMoves = [];
    for (let i = 0; i < 100; i++) {
      availableMoves.push(i);
    }

    const randomAttack = () => {
      const index = Math.floor(Math.random() * availableMoves.length);
      const move = availableMoves[index];
      availableMoves.splice(index, 1);
      return move;
    };

    return { randomAttack, type };
  }
  return { type };
}

export default createPlayer;
