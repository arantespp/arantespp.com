import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';
import { Themed } from 'theme-ui';

import Editor from '../../components/Editor';
import HTMLHeaders from '../../components/HTMLHeaders';

import { Journal } from '../../lib/files';
import { getToday } from '../../lib/getToday';

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

  React.useEffect(() => {
    if (contentFromApi) {
      setContent(contentFromApi);
    }
  }, [contentFromApi]);

  useAutoSave(content);

  return { content, setContent, date: data?.journal?.date };
};

const JournalEditor = () => {
  const { date, content, setContent } = useContent();

  const title = 'Journal Editor';

  return (
    <>
      <HTMLHeaders noIndex title={title} />
      <Themed.h1>{title}</Themed.h1>
      <Themed.h2>{date}</Themed.h2>
      <Editor
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </>
  );
};

export default JournalEditor;
