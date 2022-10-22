import * as React from 'react';
import { Flex, Themed } from 'theme-ui';
import { JournalSummaryEditable } from '../../components/JournalSummaryEditable';
import { NextSeo } from 'next-seo';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Link from '../../components/Link';

const JournalEditable = () => {
  const title = 'Journal Editable';

  const { date } = useQueryParamsDateOrToday();

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Themed.h1>{title}</Themed.h1>
      <Flex sx={{ gap: 3, marginY: 4 }}>
        <Link href="/journal">Summary</Link>
      </Flex>
      <React.Suspense>
        <JournalSummaryEditable date={date} />
      </React.Suspense>
    </>
  );
};

export default JournalEditable;
