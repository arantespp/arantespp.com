import {
  getFlashcardByProbability,
  getFlashcards,
  getPNumber,
} from './getFlashcard';
import { getPosts } from './files';

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
  [7, 969],
  [14, 939],
  [28, 882],
  [56, 779],
  [112, 607],
])('pNumber: x=%d; y=%d', (x, y) => {
  expect(getPNumber(x)).toEqual(y);
});

test.each([
  [
    "don't return recent posts",
    [
      { date: '2020-02-02' },
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
    ],
    [
      { date: '2020-02-02', diffDays: 489, pNumber: 50 },
      { date: '2020-07-28', diffDays: 312, pNumber: 0 },
      { date: '2020-12-07', diffDays: 180, pNumber: 1 },
      { date: '2021-03-15', diffDays: 82, pNumber: 0 },
      { date: '2021-05-28', diffDays: 8, pNumber: 137 },
      { date: '2021-05-29', diffDays: 7, pNumber: 969 },
      { date: '2021-05-30', diffDays: 6, pNumber: 67 },
    ],
  ],
])('getFlashcards test: %#', async (_, allPosts, returnedPosts) => {
  (getPosts as jest.Mock).mockReturnValue(allPosts);
  const flashcards = (await getFlashcards()).map(
    ({ date, diffDays, pNumber }) => ({ date, diffDays, pNumber }),
  );
  expect(flashcards).toEqual(returnedPosts);
});

describe('testing getFlashcardByProbability', () => {
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
    ] as any;

    jest.spyOn(global.Math, 'random').mockReturnValue(random);
    expect(getFlashcardByProbability(flashcards).date).toEqual(date);
  });

  test.each([
    [0],
    [0.1],
    [0.2],
    [0.3],
    [0.4],
    [0.5],
    [0.6],
    [0.7],
    [0.8],
    [0.9],
    [1],
  ])(
    'when all p-numbers is zero, must return the most recent post',
    (random) => {
      const flashcards = [
        { diffDays: 100, pNumber: 0 },
        { diffDays: 1, pNumber: 0 }, // Most recent post.
        { diffDays: 200, pNumber: 0 },
      ] as any;

      jest.spyOn(global.Math, 'random').mockReturnValue(random);
      expect(getFlashcardByProbability(flashcards).diffDays).toEqual(1);
    },
  );
});
