import createPlayer from "../player";

test("CPU player makes random, non-repeated attacks on enemy gameboard", () => {
  const cpuPlayer = createPlayer("CPU");
  const moves = [];
  for (let i = 0; i < 100; i++) {
    moves.push(cpuPlayer.randomAttack());
  }
  expect(moves.length).toEqual(new Set(moves).size);
});
