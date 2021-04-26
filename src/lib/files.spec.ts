import * as filesModule from './files';

describe('method getClosestDayOfLastWeek', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('return last tuesday - 2021-04-20', () => {
    jest.setSystemTime(new Date(2021, 3, 26));
    expect(filesModule.getClosestDayOfLastWeek('Tue')).toEqual(
      new Date(2021, 3, 20),
    );
  });
});
