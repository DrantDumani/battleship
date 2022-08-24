import createShip from "../ships";

test("Testing Ship Factory Function", () => {
  const fakeShip = {
    hit: expect.any(Function),
    isSunk: expect.any(Function)
  };
  expect(createShip(4, 2)).toEqual(fakeShip);
});

test("Ship receives an index and is hit at that index", () => {
  expect(createShip(4, 2).hit(2)).toBe(true);
});

test("Ship has been hit in all positions and has sunk", () => {
  const testShip = createShip(1, 3);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(true);
});

test("Ship has been hit in only one position. Hasn't sunk yet", () => {
  const testShip = createShip(2, 3);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(false);
});
