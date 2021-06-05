import { getPosts } from './files';

import {
  getPNumber,
  getFlashcards,
  getFlashcardByProbability,
  INTERVAL,
  MAX_P_NUMBER,
} from './getFlashcard';

jest.mock('./files', () => ({
  getPosts: jest.fn(),
}));

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2021, 5, 5, 8));
});

afterAll(() => {
  jest.useRealTimers();
});

test.each([
  ...Array.from(Array(20)).map((_, index) => {
    return [2 ** index * INTERVAL, MAX_P_NUMBER];
  }),
  [490, 428],
])('pNumber: x=%d; y=%d', (x, y) => {
  expect(getPNumber(x)).toEqual(y);
});

test.each([
  [
    "don't return recent posts",
    [
      { date: '2020-07-28' },
      { date: '2020-12-07' },
      { date: '2021-03-15' },
      { date: '2021-05-28' },
      { date: '2021-05-29' },
      { date: '2021-05-30' },
      { date: '2021-05-31' },
      { date: '2021-06-01' },
      { date: '2021-06-02' },
      { date: '2021-06-03' },
      { date: '2021-06-04' },
      { date: '2021-06-05' },
      { date: '2020-02-02' }, // Oldest post
    ],
    [
      { date: '2020-02-02', diffDays: 489, pNumber: 445 }, // Oldest post
      { date: '2020-07-28', diffDays: 312, pNumber: 0 },
      { date: '2020-12-07', diffDays: 180, pNumber: 2 },
      { date: '2021-03-15', diffDays: 82, pNumber: 0 },
      { date: '2021-05-28', diffDays: 8, pNumber: 141 },
      { date: '2021-05-29', diffDays: 7, pNumber: 1000 },
      { date: '2021-05-30', diffDays: 6, pNumber: 69 },
    ],
  ],
])('getFlashcards test: %#', async (_, allPosts, returnedPosts) => {
  (getPosts as jest.Mock).mockReturnValue(allPosts);
  expect(await getFlashcards()).toEqual(returnedPosts);
});

describe('testing getFlashcardByProbability', () => {
  const flashcards = [
    { date: '2021-02-01', pNumber: 250 },
    { date: '2021-02-02', pNumber: 250 },
    { date: '2021-02-03', pNumber: 100 },
    { date: '2021-02-04', pNumber: 100 },
    { date: '2021-02-05', pNumber: 100 },
    { date: '2021-02-06', pNumber: 50 },
    { date: '2021-02-07', pNumber: 50 },
    { date: '2021-02-08', pNumber: 50 },
    { date: '2021-02-09', pNumber: 50 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any;

  test.each([
    [0, '2021-02-01'],
    [0.1, '2021-02-01'],
    [0.249, '2021-02-01'],
    [0.25, '2021-02-01'],
    [0.251, '2021-02-02'],
    [0.499, '2021-02-02'],
    [0.5, '2021-02-02'],
    [0.501, '2021-02-03'],
    [1, '2021-02-09'],
  ])('random: %d', (random, date) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(random);
    expect(getFlashcardByProbability(flashcards).date).toEqual(date);
  });
});
