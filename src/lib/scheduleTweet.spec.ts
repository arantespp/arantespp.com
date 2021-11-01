import * as getRandomIntModule from './getRandomInt';
import { getScheduledDate, MIN_DIFF_IN_DAYS } from './scheduleTweet';

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

test('min diff in days - should call again because the first set of random in less than the min days', () => {
  const currentDate = new Date(2021, 9, 31, 8);
  jest.setSystemTime(currentDate);

  (getRandomIntModule.getRandomInt as jest.Mock) = jest
    .fn()
    /**
     * Min interval date.
     */
    .mockReturnValueOnce(0) // Week
    .mockReturnValueOnce(MIN_DIFF_IN_DAYS) // Day
    .mockReturnValueOnce(10) // Hours
    .mockReturnValueOnce(0) // Minutes;
    /**
     * getScheduledDate called again.
     */
    .mockReturnValueOnce(2) // Week
    .mockReturnValueOnce(3) // Day
    .mockReturnValueOnce(10) // Hours
    .mockReturnValueOnce(0); // Minutes;

  const result = getScheduledDate();
  expect(result.startsWith('2021-11-17')).toBeTruthy();
});

test('min diff in days - should NOT call again because the first set of random in greater than the min days', () => {
  const currentDate = new Date(2021, 9, 31, 8);
  jest.setSystemTime(currentDate);

  (getRandomIntModule.getRandomInt as jest.Mock) = jest
    .fn()
    .mockReturnValueOnce(0) // Week
    .mockReturnValueOnce(MIN_DIFF_IN_DAYS + 1) // Day
    .mockReturnValueOnce(10) // Hours
    .mockReturnValueOnce(0); // Minutes;

  getScheduledDate();

  expect(getRandomIntModule.getRandomInt).toBeCalledTimes(4);
});
