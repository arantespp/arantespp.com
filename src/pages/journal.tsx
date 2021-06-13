import { useSWRInfinite } from 'swr';
import { Box, Button, Flex, Text, Themed } from 'theme-ui';

import { Journal as JournalType } from '../lib/files';

import HTMLHeaders from '../components/HTMLHeaders';
import Loading from '../components/Loading';
import Markdown from '../components/Markdown';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKey = (page: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.journals.length) return null; // reached the end
  return `/api/journal?page=${page}`;
};

const Journal = () => {
  const { data, size, setSize } = useSWRInfinite<{
    journals: JournalType[];
  }>(getKey, fetcher);

  const showLoadMore = data && data[data?.length - 1].journals.length !== 0;

  const journals = data?.flatMap((d) => d.journals) || [];

  const markdown = journals.reduce((acc, journal) => {
    return [acc, `### ${journal?.date}`, journal?.content].join('\n');
  }, '');

  return (
    <>
      <HTMLHeaders noIndex />
      <Themed.h1>Journal</Themed.h1>
      <Box sx={{ marginY: 5 }}>
        {!data ? (
          <Loading />
        ) : (
          <>
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <Text sx={{ fontStyle: 'italic', color: 'gray' }}>
                Total: {journals.length} days.
              </Text>
            </Flex>
            <Markdown noH1 content={markdown} />
          </>
        )}
      </Box>
      {showLoadMore && (
        <Flex sx={{ justifyContent: 'center' }}>
          <Button onClick={() => setSize(size + 1)}>Load More</Button>
        </Flex>
      )}
    </>
  );
};

export default Journal;
