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
    return [acc, `### ${key} (${journal?.date})`, journal?.content].join('\n');
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
