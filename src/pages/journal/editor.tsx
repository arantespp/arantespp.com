import * as dateFns from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Box, Flex, Input, Themed, Text } from 'theme-ui';

import Editor from '../../components/Editor';
import ErrorMessage from '../../components/ErrorMessage';
import HTMLHeaders from '../../components/HTMLHeaders';
import Link from '../../components/Link';

import { Journal } from '../../../lib/journal';
import { getToday } from '../../../lib/getToday';

import { useApiKey } from '../../hooks/useApiKey';

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

const AUTO_SAVE_DELAY = 500;

const useAutoSave = (content: string) => {
  const { apiKey } = useApiKey();

  const date = useDate();

  const [error, setError] = React.useState('');

  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (!content || !date) {
      return () => null;
    }

    setIsSaving(true);

    const timeout = setTimeout(async () => {
      setError('');

      const response = await fetch('/api/journal', {
        method: 'PUT',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ date, content }),
      });

      const json = await response.json();

      if (response.status !== 200) {
        setError(`Error: ${json.error}`);
      }

      setIsSaving(false);
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timeout);
  }, [apiKey, content, date]);

  return { error, isSaving };
};

const useContent = () => {
  const date = useDate();

  const { apiKey } = useApiKey();

  const { data, isLoading: isLoadingContent } = useQuery(
    `/api/journal?date=${date}`,
    async ({ queryKey }) =>
      fetch(queryKey[0], {
        headers: {
          'x-api-key': apiKey,
        },
      }).then((r): Promise<{ journal: Journal }> => r.json()),
    { enabled: !!apiKey },
  );

  const contentFromApi = data?.journal?.content || '';

  const [content, setContent] = React.useState(contentFromApi);

  const { error, isSaving } = useAutoSave(content);

  React.useEffect(() => {
    setContent(contentFromApi);
  }, [contentFromApi]);

  return { content, setContent, date, error, isSaving, isLoadingContent };
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

      return undefined;
    })();

    /**
     * If code goes to `dateReplace` with `add`, it will replace `dateInput`
     * that could have been set by today shortcut.
     */
    if (!add) {
      return;
    }

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
  const { date, content, setContent, error, isSaving, isLoadingContent } =
    useContent();

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
      <ErrorMessage error={error} />
      <Box sx={{ marginY: 3 }}>
        <Editor
          disabled={isLoadingContent}
          isValid={!!content}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          autoFocus
        />
      </Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Flex sx={{ gap: 4 }}>
          <Link href="/journal/all">All</Link>
          <Link href="/journal">Summary</Link>
        </Flex>
        <Text sx={{ color: isSaving ? 'muted' : 'text' }}>Saved</Text>
      </Flex>
    </>
  );
};

export default JournalEditor;
