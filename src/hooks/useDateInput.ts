import * as React from 'react';
import * as dateFns from 'date-fns';
import { getToday } from '../../lib/getToday';
import { useQueryParamsDateOrToday } from './useQueryParamsDateOrToday';
import { useRouter } from 'next/router';

const isValidDate = (date: string) => dateFns.isValid(dateFns.parseISO(date));

export const useDateInput = (initialDate: string) => {
  const { today } = useQueryParamsDateOrToday();

  const { pathname, push } = useRouter();

  const [dateInput, setDateInput] = React.useState(initialDate);

  const [date, setDate] = React.useState(initialDate);

  React.useEffect(() => {
    if (date === dateInput) {
      return;
    }

    /**
     * If press "T" or "t", navigate to today date.
     */
    if (/t|T/.test(dateInput)) {
      setDate(today);
      return;
    }

    /**
     * h/H: subtract 1 day.
     * j/J: subtract 1 month.
     * k/K: add 1 month.
     * l/L: add 1 day.
     */
    const add = (() => {
      if (/h|H/.test(dateInput)) {
        return { months: -1 };
      }

      if (/j|J/.test(dateInput)) {
        return { days: -1 };
      }

      if (/k|K/.test(dateInput)) {
        return { days: 1 };
      }

      if (/l|L/.test(dateInput)) {
        return { months: 1 };
      }

      return undefined;
    })();

    /**
     * Replace everything except numbers and "-".
     */
    const dateReplace = dateInput.replace(/[^\d-]/g, '');

    if (isValidDate(dateReplace)) {
      const newDate = add
        ? dateFns.format(
            dateFns.add(dateFns.parseISO(dateReplace), add),
            'yyyy-MM-dd',
          )
        : dateInput;

      /**
       * Do not replace if the date is in the future.
       */
      if (dateFns.isFuture(dateFns.parseISO(newDate))) {
        setDate(dateReplace);
        return;
      }

      setDate(newDate);
    }
  }, [date, dateInput, today]);

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

    push({ pathname, query: { date } });
  }, [date, initialDate, pathname, push]);

  return { date, setDate: setDateInput };
};
