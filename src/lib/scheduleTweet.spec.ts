import * as getRandomIntModule from './getRandomInt';
import { getScheduledDate } from './scheduleTweet';

jest.mock('twitter-ads');

beforeAll(() => {
  jest.useFakeTimers('modern');
});

afterAll(() => {
  jest.useRealTimers();
});

test.each<[Date, number, number, number, number, string]>([
  [new Date(2021, 9, 31, 8), 2, 3, 7, 50, '2021-11-17'],
  [new Date(2021, 9, 31, 8), 2, 2, 7, 50, '2021-11-16'],
  [new Date(2021, 9, 31, 8), 0, 4, 7, 50, '2021-11-04'],
])(
  'getScheduledDate %#',
  (
    currentDate,
    addRandomWeek,
    setRandomDay,
    setRandomHour,
    setRandomMinute,
    startsWith,
  ) => {
    (getRandomIntModule.getRandomInt as jest.Mock) = jest
      .fn()
      .mockReturnValueOnce(addRandomWeek)
      .mockReturnValueOnce(setRandomDay)
      .mockReturnValueOnce(setRandomHour)
      .mockReturnValueOnce(setRandomMinute);

    jest.setSystemTime(currentDate);

    const result = getScheduledDate();
    expect(result.startsWith(startsWith)).toBeTruthy();
  },
);