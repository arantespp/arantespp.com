import * as React from 'react';
import useSWR from 'swr';

import { JournalsSummary } from '../../lib/files';
import { getToday } from '../../lib/getToday';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journal from '../../components/Journal';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useJournalsSummary = () => {
  const today = getToday();

  const { data } = useSWR<{
    summary: JournalsSummary;
  }>(`/api/journal/summary?date=${today}`, fetcher);

  const summary = data?.summary.reduce((acc, { key, journal }) => {
    /**
     * Go to editor if isn't in production environment.
     */
    const header = (() => {
      if (process.env.NODE_ENV === 'production') {
        return `### ${key} (${journal?.date})`;
      }

      return `### [${key} (${journal?.date})](/journal/editor?date=${journal?.formattedDate})`;
    })();
    return [acc, header, journal?.content].join('\n');
  }, '');

  return summary;
};

const JournalIndex = () => {
  const summary = useJournalsSummary();
  return (
    <>
      <HTMLHeaders noIndex title="Journal" />
      <Journal markdown={summary} title="Journal" />
    </>
  );
};

export default JournalIndex;
