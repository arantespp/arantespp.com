import * as dateFns from 'date-fns';

const dayOfWeekMap = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thur: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/**
 * https://stackoverflow.com/a/54148600/8786986
 */
export const getClosestLastWeekDay = (
  dayOfWeek: keyof typeof dayOfWeekMap,
  fromDate = new Date(),
) => {
  const offsetDays = dayOfWeekMap[dayOfWeek] - dateFns.getISODay(fromDate);
  return dateFns.addDays(fromDate, offsetDays);
};
