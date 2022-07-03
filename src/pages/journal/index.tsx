import * as React from 'react';
import { JournalDateNavigator } from '../../components/JournalDateNavigator';
import { JournalSummary } from '../../components/JournalSummary';
import { NextSeo } from 'next-seo';
import { useDateInput } from '../../hooks/useDateInput';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Loading from '../../components/Loading';

const title = 'Journal Summary';

const JournalIndex = () => {
  const { date: initialDate } = useQueryParamsDateOrToday();

  const { date, setDate } = useDateInput(initialDate);

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <JournalDateNavigator date={date} setDate={setDate} />
      <React.Suspense fallback={<Loading />}>
        <JournalSummary date={date} />
      </React.Suspense>
    </>
  );
};

export default JournalIndex;
