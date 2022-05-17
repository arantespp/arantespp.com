import * as React from 'react';
import * as dateFns from 'date-fns';
import { Button, Flex, Input, Text } from 'theme-ui';
import { JournalsSummary } from '../../../lib/journal';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useDateInput } from '../../hooks/useDateInput';
import { useQuery } from 'react-query';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Journal from '../../components/Journal';
import Link from '../../components/Link';
import Loading from '../../components/Loading';

const title = 'Journal Summary';

const useDate = () => {
  const { date: initialDate } = useQueryParamsDateOrToday();

  const { date, setDate } = useDateInput(initialDate);

  const addOneDayToDate = (addValue: number) => () => {
    const format = 'yyyy-MM-dd';

    const parsedDate = dateFns.parse(date, format, new Date());

    const addDay = dateFns.addDays(parsedDate, addValue);

    setDate(dateFns.format(addDay, format));
  };

  return { date, setDate, addOneDayToDate };
};

const Summary = ({ date }: { date: string }) => {
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

  return <Journal markdown={summary} title={title} />;
};

const JournalIndex = () => {
  const { date, setDate, addOneDayToDate } = useDate();

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Text>
        {dateFns.format(dateFns.parse(date, 'yyyy-MM-dd', new Date()), 'PPPP')}
      </Text>
      <Flex sx={{ gap: 2 }}>
        <Button
          sx={{ flexBasis: ['100%', '120px'] }}
          onClick={addOneDayToDate(-1)}
        >
          Previous
        </Button>
        <Input
          sx={{ flex: 1, display: ['none', 'block'] }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          autoFocus
        />
        <Button
          sx={{ flexBasis: ['100%', '120px'] }}
          onClick={addOneDayToDate(1)}
        >
          Next
        </Button>
      </Flex>
      <React.Suspense fallback={<Loading />}>
        <Summary date={date} />
      </React.Suspense>
      <Link href="/journal/all">All</Link>
    </>
  );
};

export default JournalIndex;
