import * as React from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import { Box, Button, Flex, Text } from 'theme-ui';

import { Journal as JournalType, JournalSummary } from '../lib/files';

import Heading from '../components/Heading';
import HTMLHeaders from '../components/HTMLHeaders';
import Loading from '../components/Loading';
import Markdown from '../components/Markdown';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useJournalsSummary = () => {
  /**
   * https://stackoverflow.com/a/29774197/8786986
   */
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const dateWithOffset = new Date(today.getTime() - offset * 60 * 1000);
  const date = dateWithOffset.toISOString().split('T')[0];

  const { data } = useSWR<{
    summary: JournalSummary;
  }>(`/api/journal/summary?date=${date}`, fetcher);

  const summary = data?.summary.reduce((acc, { key, journal }) => {
    return [acc, `### ${key} - ${journal?.date}`, journal?.content].join('\n');
  }, '');

  return summary;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKey = (page: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.journals.length) return null; // reached the end
  return `/api/journal?page=${page}`;
};

const SectionTitle: React.FC = ({ children }) => {
  return (
    <Box sx={{ marginTop: 5, marginBottom: 4 }}>
      <Heading level={2}>{children}</Heading>
    </Box>
  );
};

const Journal = () => {
  const summary = useJournalsSummary();

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

  const journalRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <HTMLHeaders noIndex title="Journal" />
      <Heading level={1}>Journal</Heading>

      <SectionTitle>Summary</SectionTitle>

      {summary && (
        <Box>
          <Markdown noH1 content={summary} />
        </Box>
      )}

      <SectionTitle>All</SectionTitle>

      <Box>
        {!data ? (
          <Loading />
        ) : (
          <>
            <Flex sx={{ justifyContent: 'flex-start' }}>
              <Text sx={{ fontStyle: 'italic', color: 'gray', fontSize: 2 }}>
                Total: {journals.length} days (
                <Text
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => {
                    if (journalRef.current?.innerText) {
                      navigator.clipboard.writeText(
                        journalRef.current?.innerText,
                      );
                    }
                  }}
                >
                  copy text to clipboard
                </Text>
                ).
              </Text>
            </Flex>
            <Box ref={journalRef}>
              <Markdown noH1 content={markdown} />
            </Box>
          </>
        )}
      </Box>
      {showLoadMore && (
        <Flex sx={{ justifyContent: 'center' }}>
          <Button
            disabled={isValidating}
            sx={{ backgroundColor: isValidating ? 'muted' : 'primary' }}
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
