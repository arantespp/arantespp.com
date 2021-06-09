import { useSWRInfinite } from 'swr';
import { Box, Button, Flex, Themed } from 'theme-ui';

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
  const { data, isValidating, size, setSize } = useSWRInfinite<{
    journals: JournalType[];
  }>(getKey, fetcher);

  const markdown = (data?.flatMap(({ journals }) => journals) || []).reduce(
    (acc, journal) => {
      return [acc, `### ${journal?.date}`, journal?.content].join('\n');
    },
    '',
  );

  return (
    <>
      <HTMLHeaders noIndex />
      <Themed.h1>Journal</Themed.h1>
      <Box sx={{ marginTop: 6, marginBottom: 5 }}>
        {isValidating ? <Loading /> : <Markdown noH1 content={markdown} />}
      </Box>
      <Flex sx={{ justifyContent: 'center' }}>
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </Flex>
    </>
  );
};

export default Journal;
