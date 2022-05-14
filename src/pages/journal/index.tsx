import * as React from 'react';
import { Input } from 'theme-ui';
import { JournalsSummary } from '../../../lib/journal';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useDateInput } from '../../hooks/useDateInput';
import { useQuery } from 'react-query';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Journal from '../../components/Journal';
import Link from '../../components/Link';

const useJournalsSummary = () => {
  const { date: initialDate } = useQueryParamsDateOrToday();

  const { date, setDate } = useDateInput(initialDate);

  const { apiKey } = useApiKey();

  const { data } = useQuery(
    `/api/journal/summary?date=${date}`,
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': apiKey,
        },
      }).then((r): Promise<{ summary: JournalsSummary }> => r.json());
    },
    { enabled: Boolean(date && apiKey) },
  );

  const summary =
    data?.summary?.reduce((acc, { key, journal }) => {
      const header = `### [${key} (${journal?.formattedDate})](/journal/editor?date=${journal?.date})`;

      return [acc, header, journal?.content].join('\n');
    }, '') || '';

  return { date, summary, setDate };
};

const JournalIndex = () => {
  const { summary, date, setDate } = useJournalsSummary();

  return (
    <>
      <NextSeo noindex nofollow title="Journal" />
      <Input
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        autoFocus
      />
      <Journal markdown={summary} title="Journal" />
      {summary && <Link href="/journal/all">All</Link>}
    </>
  );
};

export default JournalIndex;
