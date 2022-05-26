import * as React from 'react';
import * as dateFns from 'date-fns';
import { Button, Flex, Input, Text } from 'theme-ui';
import { JournalSummary } from '../../components/JournalSummary';
import { NextSeo } from 'next-seo';
import { useDateInput } from '../../hooks/useDateInput';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import { useResponsiveValue } from '@theme-ui/match-media';
import Link from '../../components/Link';
import Loading from '../../components/Loading';

const title = 'Journal Summary';

const useDate = () => {
  const { date: initialDate, today } = useQueryParamsDateOrToday();

  const { date, setDate } = useDateInput(initialDate);

  const addOneDayToDate = (addValue: number) => () => {
    const format = 'yyyy-MM-dd';

    const parsedDate = dateFns.parse(date, format, new Date());

    const addDay = dateFns.addDays(parsedDate, addValue);

    setDate(dateFns.format(addDay, format));
  };

  return { date, setDate, addOneDayToDate, today };
};

const JournalIndex = () => {
  const { date, setDate, addOneDayToDate, today } = useDate();

  const middle = useResponsiveValue(['today', 'input']);

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
          onClick={() => setDate(today)}
        >
          Today
        </Button>
        <Button
          sx={{ flexBasis: ['100%', '120px'] }}
          onClick={addOneDayToDate(1)}
        >
          Next
        </Button>
      </Flex>
      <React.Suspense fallback={<Loading />}>
        <JournalSummary date={date} />
      </React.Suspense>
      <Link href="/journal/all">All</Link>
    </>
  );
};

export default JournalIndex;
