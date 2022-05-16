import * as dateFns from 'date-fns';
import { getClosestLastWeekDay } from './getClosestLastWeekDay';

const WEEK_DAY = 'Tue';

const HOURS_IN_BRAZILIAN = 10;

const getLastMonday = () => getClosestLastWeekDay(WEEK_DAY);

export const getNextNewsletterDate = ({ format }: { format?: string } = {}) => {
  const nextDigestDate = dateFns.set(
    dateFns.add(getLastMonday(), { days: 7 }),
    {
      hours: HOURS_IN_BRAZILIAN + getLastMonday().getTimezoneOffset() / 60,
      minutes: -getLastMonday().getTimezoneOffset(),
      seconds: 0,
    },
  );

  if (!format) {
    return nextDigestDate.toISOString();
  }

  return dateFns.format(nextDigestDate, format);
};
