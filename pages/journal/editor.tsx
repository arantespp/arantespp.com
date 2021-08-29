import * as dateFns from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';
import { Input, Themed } from 'theme-ui';

import Editor from '../../src/components/Editor';
import HTMLHeaders from '../../src/components/HTMLHeaders';
import Link from '../../src/components/Link';

import { Journal } from '../../src/lib/files';
import { getToday } from '../../src/lib/getToday';

const useDate = () => {
  const { asPath, push, query } = useRouter();

  const date = (query.date as string | undefined) || getToday();

  /**
   * Add `date` to the URL if it's not already there. It's easier to edit date if needed.
   */
  React.useEffect(() => {
    if (!asPath.includes('?date=')) {
      push({ pathname: asPath, query: { date } });
    }
  }, [asPath, date, push, query.date]);

  return date;
};

const AUTO_SAVE_DELAY = 1000;

const useAutoSave = (content: string) => {
  const date = useDate();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!content || !date) {
        return;
      }

      fetch('/api/journal', {
        method: 'PUT',
        body: JSON.stringify({ date, content }),
      });
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timeout);
  }, [content, date]);
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useContent = () => {
  const date = useDate();

  const { data } = useSWR<{
    journal: Journal;
  }>(`/api/journal?date=${date}`, fetcher);

  const contentFromApi = data?.journal?.content || '';

  const [content, setContent] = React.useState(contentFromApi);

  useAutoSave(content);

  React.useEffect(() => {
    setContent(contentFromApi);
  }, [contentFromApi]);

  return { content, setContent, date };
};

const isValidDate = (date: string) => dateFns.isValid(dateFns.parseISO(date));

const useDateInput = (date: string) => {
  const { pathname, push } = useRouter();

  const [dateInput, setDateInput] = React.useState(date);

  /**
   * If press "T" or "t", navigate to today date.
   */
  React.useEffect(() => {
    const today = getToday();

    if (/t|T/.test(dateInput) && dateInput !== today) {
      setDateInput(today);
    }
  }, [dateInput]);

  /**
   * h/H: subtract 1 day.
   * j/J: subtract 1 month.
   * k/K: add 1 month.
   * l/L: add 1 day.
   */
  React.useEffect(() => {
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

      return {};
    })();

    /**
     * Replace everything except numbers and "-".
     */
    const dateReplace = dateInput.replace(/[^\d-]/g, '');

    if (isValidDate(dateReplace)) {
      setDateInput(
        dateFns.format(
          dateFns.add(dateFns.parseISO(dateReplace), add),
          'yyyy-MM-dd',
        ),
      );
    }
  }, [dateInput]);

  React.useEffect(() => {
    /**
     * Do not push if the date is the same as the current date.
     */
    if (dateInput === date) {
      return;
    }

    /**
     * Do not push if date don't match the API format.
     */
    if (!dateFns.isMatch(dateInput, 'yyyy-MM-dd')) {
      return;
    }

    /**
     * Do not push if the date is invalid.
     */
    if (!isValidDate(dateInput)) {
      return;
    }

    push({ pathname, query: { date: dateInput } });
  }, [date, dateInput, pathname, push]);

  return { dateInput, setDateInput };
};

const JournalEditor = () => {
  const { date, content, setContent } = useContent();

  const { dateInput, setDateInput } = useDateInput(date);

  const title = 'Journal Editor';

  return (
    <>
      <HTMLHeaders noIndex title={title} />
      <Themed.h1>{title}</Themed.h1>
      <Input
        value={dateInput}
        onChange={(e) => {
          setDateInput(e.target.value);
        }}
      />
      <Editor
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        sx={{ marginY: 3 }}
        autoFocus
      />
      <Link href="/journal">Go to Summary</Link>
    </>
  );
};

export default JournalEditor;
