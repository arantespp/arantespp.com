import * as React from 'react';
import { Button, Flex } from 'theme-ui';
import { Journal as JournalType } from '../../../lib/journal';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useInfiniteQuery } from 'react-query';
import Journal from '../../components/Journal';
import Link from '../../components/Link';

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
      `## [${journal?.formattedDate}](/journal/${journal?.date})`,
      journal?.content,
    ].join('\n');
  }, '');

  return (
    <>
      <NextSeo noindex nofollow title="Journal - All" />
      <Flex sx={{ marginY: 4 }}>
        <Link href="/journal">Summary</Link>
      </Flex>
      <Journal
        markdown={markdown}
        title={`Journal - All (${journals.length})`}
      />
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
