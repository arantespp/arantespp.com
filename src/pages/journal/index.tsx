import * as React from 'react';
import useSWR from 'swr';

import { JournalSummary } from '../../lib/files';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journals from '../../components/Journals';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useJournalsSummary = () => {
  /**
   * https://stackoverflow.com/a/29774197/8786986
   */
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const dateWithOffset = new Date(today.getTime() - offset * 60 * 1000);
  const date = dateWithOffset.toISOString().split('T')[0];

  const { data } = useSWR<{
    summary: JournalSummary;
  }>(`/api/journal/summary?date=${date}`, fetcher);

  const summary = data?.summary.reduce((acc, { key, journal }) => {
    return [acc, `### ${key} (${journal?.date})`, journal?.content].join('\n');
  }, '');

  return summary;
};

const Journal = () => {
  const summary = useJournalsSummary();
  return (
    <>
      <HTMLHeaders noIndex title="Journal" />
      <Journals markdown={summary} title="Journals" />
    </>
  );
};

export default Journal;
