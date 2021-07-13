import * as React from 'react';
import { useSWRInfinite } from 'swr';
import { Button, Flex } from 'theme-ui';

import { Journal as JournalType } from '../../lib/files';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journals from '../../components/Journals';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKey = (page: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.journals.length) return null; // reached the end
  return `/api/journal?page=${page}`;
};

const Journal = () => {
  const { data, isValidating, size, setSize } = useSWRInfinite<{
    journals: JournalType[];
  }>(getKey, fetcher);

  const showLoadMore = (() => {
    if (!data) {
      return false;
    }

    if (data[data.length - 1].journals.length === 0) {
      return false;
    }

    /**
     * Last two data has different length.
     */
    if (
      data.length > 1 &&
      data[data.length - 1].journals.length !==
        data[data.length - 2].journals.length
    ) {
      return false;
    }

    return true;
  })();

  const journals = data?.flatMap((d) => d.journals) || [];

  const markdown = journals.reduce((acc, journal) => {
    return [acc, `### ${journal?.date}`, journal?.content].join('\n');
  }, '');

  return (
    <>
      <HTMLHeaders noIndex title="Journal - All" />
      <Journals markdown={markdown} title="Journals - All" />
      {showLoadMore && (
        <Flex sx={{ justifyContent: 'center' }}>
          <Button
            disabled={isValidating}
            sx={{
              backgroundColor: isValidating ? 'muted' : 'primary',
              marginY: 4,
            }}
            onClick={() => setSize(size + 1)}
          >
            Load More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Journal;
