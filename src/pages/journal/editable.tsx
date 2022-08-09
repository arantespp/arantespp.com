import * as React from 'react';
import { JournalSummaryEditable } from '../../components/JournalSummaryEditable';
import { NextSeo } from 'next-seo';
import { Themed } from 'theme-ui';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';

const JournalEditable = () => {
  const title = 'Journal Editable';

  const { date } = useQueryParamsDateOrToday();

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Themed.h1>{title}</Themed.h1>
      <React.Suspense>
        <JournalSummaryEditable date={date} />
      </React.Suspense>
    </>
  );
};

export default JournalEditable;
