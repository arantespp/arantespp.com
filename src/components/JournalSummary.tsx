import * as React from 'react';
import { JournalsSummary } from '../../lib/journal';
import { useApiKey } from '../hooks/useApiKey';
import { useQuery } from 'react-query';
import Journal from './Journal';

export const useJournalSummary = ({ date }: { date: string }) => {
  const { apiKey } = useApiKey();

  const { data } = useQuery(
    [`/api/journal/summary?date=${date}`, apiKey],
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then((r): Promise<{ summary: JournalsSummary }> => r.json());
    },
    { enabled: Boolean(date && apiKey) },
  );

  const summary =
    data?.summary?.reduce((acc, { key, journal }) => {
      const header = `## [${key} - ${journal?.formattedDate})](/journal/${journal?.date}\n`;

      return [acc, header, journal?.content + '\n\n'].join('\n');
    }, '') || '';

  return { summary };
};

export const JournalSummary = ({ date }: { date: string }) => {
  const { summary } = useJournalSummary({ date });

  return <Journal markdown={summary} title={'Summary'} />;
};
