import * as dateFns from 'date-fns';

const dayOfWeekMap = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

export type DayOfWeek = keyof typeof dayOfWeekMap;

/**
 * https://stackoverflow.com/a/54148600/8786986
 */
export const getClosestLastWeekDay = (
  dayOfWeek: DayOfWeek,
  fromDate = new Date(),
) => {
  const offsetDays = dateFns.getISODay(fromDate) - dayOfWeekMap[dayOfWeek];
  const subtractDays = offsetDays <= 0 ? offsetDays + 7 : offsetDays;
  return dateFns.subDays(fromDate, subtractDays);
};
