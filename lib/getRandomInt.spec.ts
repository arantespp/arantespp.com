import { getRandomInt } from './getRandomInt';

beforeEach(() => {
  jest.restoreAllMocks();
});

test.each([
  [0, 1],
  [0.1, 1],
  [0.2, 2],
  [0.3, 2],
  [0.4, 3],
  [0.5, 3],
  [0.6, 4],
  [0.7, 4],
  [0.8, 5],
  [0.9, 5],
  [0.999, 5],
])('getRandomInt between 1 and 5 #%#', (mathRandom, response) => {
  jest.spyOn(Math, 'random').mockReturnValue(mathRandom);
  expect(getRandomInt({ min: 1, max: 5 })).toEqual(response);
});
