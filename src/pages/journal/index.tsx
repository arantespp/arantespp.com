import * as React from 'react';
import { Flex } from 'theme-ui';
import { JournalDateNavigator } from '../../components/JournalDateNavigator';
import { JournalSummary } from '../../components/JournalSummary';
import { NextSeo } from 'next-seo';
import { useDateInput } from '../../hooks/useDateInput';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Link from '../../components/Link';
import Loading from '../../components/Loading';

const title = 'Journal Summary';

const JournalIndex = () => {
  const { date: initialDate } = useQueryParamsDateOrToday();

  const { date, setDate } = useDateInput(initialDate);

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Flex sx={{ gap: 3, marginY: 4 }}>
        <Link href="/journal/all">All</Link>
        <Link href="/journal/editable">Editable</Link>
        <Link href="/journal/editor">Editor</Link>
        <Link href="/journal/stats">Stats</Link>
      </Flex>
      <JournalDateNavigator date={date} setDate={setDate} />
      <React.Suspense fallback={<Loading />}>
        <JournalSummary date={date} />
      </React.Suspense>
    </>
  );
};

export default JournalIndex;
