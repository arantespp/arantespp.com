import * as React from 'react';
import { useInfiniteQuery } from 'react-query';
import { Button, Flex } from 'theme-ui';

import { Journal as JournalType } from '../../../lib/journal';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journal from '../../components/Journal';

import { useApiKey } from '../../hooks/useApiKey';

const JournalAll = () => {
  const { apiKey } = useApiKey();

  const fetchJournals = ({ pageParam = 0 }) =>
    fetch(`/api/journals?page=${pageParam}`, {
      headers: {
        'x-api-key': apiKey,
      },
    }).then((r): Promise<JournalType[]> => r.json());

  const {
    data,
    // error,
    // fetchNextPage,
    hasNextPage,
    isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery('projects', fetchJournals, {
    // getNextPageParam: (lastPage, pages) => 0,
    enabled: !!apiKey,
  });

  const journals = data?.pages.flatMap((d) => d || []) || [];

  const markdown = journals.reduce((acc, journal) => {
    return [
      acc,
      `### [${journal?.date}](/journal/editor?date=${journal?.date})`,
      journal?.content,
    ].join('\n');
  }, '');

  return (
    <>
      <HTMLHeaders noIndex title="Journal - All" />
      <Journal markdown={markdown} title="Journal - All" />
      {hasNextPage && (
        <Flex sx={{ justifyContent: 'center' }}>
          <Button
            disabled={isFetching}
            sx={{
              backgroundColor: isFetching ? 'muted' : 'primary',
              marginY: 4,
            }}
            onClick={() => null}
          >
            Load More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default JournalAll;
