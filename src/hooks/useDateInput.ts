import * as React from 'react';
import * as dateFns from 'date-fns';
import { getToday } from '../../lib/getToday';
import { useRouter } from 'next/router';

const isValidDate = (date: string) => dateFns.isValid(dateFns.parseISO(date));

export const useDateInput = (initialDate: string) => {
  const { pathname, push } = useRouter();

  const [date, setDate] = React.useState(initialDate);

  /**
   * If press "T" or "t", navigate to today date.
   */
  React.useEffect(() => {
    const today = getToday();

    if (/t|T/.test(date) && date !== today) {
      setDate(today);
    }
  }, [date]);

  /**
   * h/H: subtract 1 day.
   * j/J: subtract 1 month.
   * k/K: add 1 month.
   * l/L: add 1 day.
   */
  React.useEffect(() => {
    const add = (() => {
      if (/h|H/.test(date)) {
        return { months: -1 };
      }

      if (/j|J/.test(date)) {
        return { days: -1 };
      }

      if (/k|K/.test(date)) {
        return { days: 1 };
      }

      if (/l|L/.test(date)) {
        return { months: 1 };
      }

      return undefined;
    })();

    /**
     * If code goes to `dateReplace` with `add`, it will replace `date`
     * that could have been set by today shortcut.
     */
    if (!add) {
      return;
    }

    /**
     * Replace everything except numbers and "-".
     */
    const dateReplace = date.replace(/[^\d-]/g, '');

    if (isValidDate(dateReplace)) {
      const newDate = dateFns.format(
        dateFns.add(dateFns.parseISO(dateReplace), add),
        'yyyy-MM-dd',
      );

      /**
       * Do not replace if the date is in the future.
       */
      if (dateFns.isFuture(dateFns.parseISO(newDate))) {
        setDate(dateReplace);
        return;
      }

      setDate(newDate);
    }
  }, [date]);

  React.useEffect(() => {
    /**
     * Do not push if the date is the same as the current date.
     */
    if (date === initialDate) {
      return;
    }

    /**
     * Do not push if date don't match the API format.
     */
    if (!dateFns.isMatch(date, 'yyyy-MM-dd')) {
      return;
    }

    /**
     * Do not push if the date is invalid.
     */
    if (!isValidDate(date)) {
      return;
    }

    push({ pathname, query: { date: date } });
  }, [date, initialDate, pathname, push]);

  return { date, setDate };
};
