import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Flex } from 'theme-ui';

import HTMLHeaders from '../../components/HTMLHeaders';
import Journal from '../../components/Journal';
import Link from '../../components/Link';

import { useApiKey } from '../../hooks/useApiKey';

const JournalPage = () => {
  const { apiKey } = useApiKey();

  const router = useRouter();
  const { date } = router.query;

  const { data } = useQuery(
    `/api/journal?date=${date}`,
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': apiKey,
        },
      }).then((r): Promise<any> => r.json());
    },
    { enabled: Boolean(date && apiKey) },
  );

  const content = data?.journal?.content || '';

  const title = `Journal - ${data?.journal?.formattedDate}`;

  return (
    <>
      <HTMLHeaders noIndex title={title} />
      <Journal markdown={content} title={title} />
      <Flex sx={{ gap: 3 }}>
        <Link href={`/journal/editor?date=${date}`}>Edit</Link>
        <Link href="/journal">Summary</Link>
      </Flex>
    </>
  );
};

export default JournalPage;
