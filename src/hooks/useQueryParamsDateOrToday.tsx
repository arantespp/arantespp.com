import * as React from 'react';
import { getToday } from '../../lib/getToday';
import { useRouter } from 'next/router';

const useNextQueryParams = (): { [key: string]: string } => {
  const router = useRouter();

  const value = React.useMemo(() => {
    // @see https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const queryParamsStr = router.asPath.split('?').slice(1).join('');
    const urlSearchParams = new URLSearchParams(queryParamsStr);
    // the first key might be in the shape "/assets?foobar", we must change to "foobar"
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }, [router.asPath]);

  return value;
};

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

  return { date };
};
