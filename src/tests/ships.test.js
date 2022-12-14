import createShip from "../ships";

test("Ships can be aligned vertically or horizontally", () => {
  const testShipHor = createShip(3, 2, "horizontal");
  expect(testShipHor.getShipLocation()).toEqual([3, 4]);
  const testShipVer = createShip(3, 2, "vertical");
  expect(testShipVer.getShipLocation()).toEqual([3, 13]);
});

test("Ship of length 1 is attacked and sinks. Ship does not sink until it has been hit", () => {
  const testShip = createShip(3, 1);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(true);
});

test("Ship of length 4 only sinks when attacked in all of its indices.", () => {
  const testShip = createShip(21, 4);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(21);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(22);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(23);
  expect(testShip.isSunk()).toBe(false);
  testShip.hit(24);
  expect(testShip.isSunk()).toBe(true);
});
