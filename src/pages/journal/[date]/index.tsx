import { Flex } from 'theme-ui';
import { JournalDateNavigator } from '../../../components/JournalDateNavigator';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../../hooks/useApiKey';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Journal from '../../../components/Journal';
import Link from '../../../components/Link';

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

  const content = data?.journal?.content || '_No content._';

  const title = `Journal - ${data?.journal?.formattedDate}`;

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Flex sx={{ gap: 3, marginY: 4 }}>
        <Link href="/journal/all">All</Link>
        <Link href={`/journal/editor?date=${date}`}>Edit</Link>
        <Link href="/journal">Summary</Link>
        <Link href="/journal/editable?date=${date}">Editable</Link>
        <Link href={`/journal/backup/${date}`}>Backup</Link>
      </Flex>
      <JournalDateNavigator
        date={date as string}
        setDate={(d) => {
          router.push(`/journal/${d}`);
        }}
      />
      <Journal markdown={content} title={title} />
    </>
  );
};

export default JournalPage;
