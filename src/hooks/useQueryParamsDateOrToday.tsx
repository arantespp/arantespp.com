import * as React from 'react';
import { getToday } from '../../lib/getToday';
import { useNextQueryParams } from './useNextQueryParams';
import { useRouter } from 'next/router';

export const useQueryParamsDateOrToday = () => {
  const { asPath, push } = useRouter();

  const query = useNextQueryParams();

  const today = getToday();

  const date = query.date || today;

  /**
   * Add `date` to the URL if it's not already there. It's easier to edit date if needed.
   */
  React.useEffect(() => {
    if (!asPath.includes('?date=')) {
      /**
       * If date is today, do nothing to keep the URL clean to save the URL on
       * mobile.
       */
      if (date === today) {
        return;
      }

      push({ pathname: asPath, query: { date } });
    }
  }, [asPath, date, push, query.date, today]);

  return { date, today };
};
