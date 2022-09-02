import { Flex, Text } from 'theme-ui';
import { JournalDateNavigator } from '../../../components/JournalDateNavigator';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../../hooks/useApiKey';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Heading from '../../../components/Heading';
import Journal from '../../../components/Journal';
import Link from '../../../components/Link';

const JournalBackupPage = () => {
  const { apiKey } = useApiKey();

  const router = useRouter();

  const { date } = router.query;

  const { data } = useQuery(
    `/api/journal/backup?date=${date}`,
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': apiKey,
        },
      }).then(
        (
          r,
        ): Promise<{
          backup: {
            content: string;
            dateTime: string;
          }[];
        }> => r.json(),
      );
    },
    { enabled: Boolean(date && apiKey), placeholderData: { backup: [] } },
  );

  const title = `Journal Backup - ${date}`;

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Flex sx={{ flexDirection: 'column' }}>
        {data?.backup
          .sort((a, b) => ((b as any).dateTime > (a as any).dateTime ? 1 : -1))
          .map(({ content, dateTime }) => (
            <Flex
              key={dateTime}
              sx={{ flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(content);
              }}
            >
              <Heading as="h2">{dateTime}</Heading>
              <Text sx={{}}>{content}</Text>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default JournalBackupPage;
