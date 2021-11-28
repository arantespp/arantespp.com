import * as dateFns from 'date-fns';

import * as getRandomIntModule from './getRandomInt';
import {
  getScheduledDate,
  shouldSkipDay,
  WEEKEND_PROPORTION,
  SKIP_DAYS,
} from './scheduleTweet';

jest.mock('twitter-ads');

beforeAll(() => {
  jest.restoreAllMocks();
  jest.useFakeTimers('modern');
});

afterAll(() => {
  jest.useRealTimers();
});

// test('test proportion', () => {
//   const p = {};

//   for (let i = 0; i < 10000; i++) {
//     const d = dateFns.format(new Date(getScheduledDate()), 'yyyy-MM-dd EEEE');

//     if (p[d]) {
//       p[d]++;
//     } else {
//       p[d] = 1;
//     }
//   }

//   const sorted = Object.keys(p)
//     .sort()
//     .reduce((acc, key) => {
//       acc[key] = p[key];
//       return acc;
//     }, {});

//   console.log(sorted);

//   expect(1).toBe(1);
// });

test('getScheduledDate', () => {
  jest.setSystemTime(new Date(2021, 10, 10, 8));

  jest.spyOn(getRandomIntModule, 'getWeightedRandomInt').mockReturnValue(7);

  const scheduledDate = getScheduledDate();

  const isSameDay = dateFns.isSameDay(
    new Date(scheduledDate),
    new Date(2021, 10, 18, 8),
  );

  expect(isSameDay).toBeTruthy();
  /**
   * 2020-10-10 is Wednesday, so the weight array should must starts with:
   * [1, 1, 0.28, 0.28, 1, ...]
   */
  expect(getRandomIntModule.getWeightedRandomInt).toHaveBeenCalledWith([
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
    1,
    WEEKEND_PROPORTION,
    WEEKEND_PROPORTION,
    1,
    1,
    1,
    1,
  ]);
});

test.each(SKIP_DAYS.map((skipDay) => [skipDay]))(
  'shouldSkipDay: %s',
  (skipDay) => {
    const [month, day] = skipDay.split('-').map(Number);
    const date = new Date(2021, month - 1, day, 8);
    expect(shouldSkipDay(date)).toBeTruthy();
  },
);
