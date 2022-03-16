import * as React from 'react';
import { useQuery } from 'react-query';

import { JournalsSummary } from '../../../lib/journal';
import { getToday } from '../../../lib/getToday';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journal from '../../components/Journal';
import Link from '../../components/Link';

import { useApiKey } from '../../hooks/useApiKey';

const useJournalsSummary = () => {
  const today = getToday();

  const { apiKey } = useApiKey();

  const { data } = useQuery(
    `/api/journal/summary?date=${today}`,
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': apiKey,
        },
      }).then((r): Promise<{ summary: JournalsSummary }> => r.json());
    },
    { enabled: Boolean(today && apiKey) },
  );

  const summary = data?.summary?.reduce((acc, { key, journal }) => {
    const header = `### [${key} (${journal?.formattedDate})](/journal/editor?date=${journal?.date})`;

    return [acc, header, journal?.content].join('\n');
  }, '');

  return summary || '';
};

const JournalIndex = () => {
  const summary = useJournalsSummary();

  return (
    <>
      <HTMLHeaders noIndex title="Journal" />
      <Journal markdown={summary} title="Journal" />
      <Link href="/journal/all">All</Link>
    </>
  );
};

export default JournalIndex;
