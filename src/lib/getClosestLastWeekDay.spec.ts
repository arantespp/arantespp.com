import { getClosestLastWeekDay, DayOfWeek } from './getClosestLastWeekDay';

describe('method getClosestDayOfLastWeek', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test.each<[Date, DayOfWeek, Date]>([
    [new Date(2021, 3, 27, 8), 'Mon', new Date(2021, 3, 26, 8)],
    [new Date(2021, 4, 31, 8), 'Mon', new Date(2021, 4, 24, 8)],
  ])('%s - %s - %s', (currentDate, lastWeekDay, lastDate) => {
    jest.setSystemTime(currentDate);
    expect(getClosestLastWeekDay(lastWeekDay)).toEqual(lastDate);
  });
});
