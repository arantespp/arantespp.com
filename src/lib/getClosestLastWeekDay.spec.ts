import { getClosestLastWeekDay } from './getClosestLastWeekDay';

describe('method getClosestDayOfLastWeek', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('return last Monday - 2021-04-26', () => {
    jest.setSystemTime(new Date(2021, 3, 27, 8));
    expect(getClosestLastWeekDay('Mon')).toEqual(new Date(2021, 3, 26, 8));
  });
});
