import * as React from 'react';
import { Flex, Text } from 'theme-ui';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Heading from '../../components/Heading';

const Stat = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      sx={{
        display: 'block',
        marginBottom: 3,
        color: 'gray',
        fontStyle: 'italic',
      }}
    >
      {children}
    </Text>
  );
};

const MissingDatesNumber = ({
  missingDatesNumber = 0,
}: {
  missingDatesNumber?: number;
}) => <Stat>{missingDatesNumber} missing dates.</Stat>;

const MaxStreak = ({ maxStreak = 0 }: { maxStreak?: number }) => (
  <Stat>{maxStreak} days streak.</Stat>
);

const AllDatesNumber = ({
  allDatesNumber = 0,
}: {
  allDatesNumber?: number;
}) => <Stat>{allDatesNumber} total dates.</Stat>;

const JournalStats = () => {
  const router = useRouter();

  const { apiKey } = useApiKey();

  const { data } = useQuery(
    [`/api/journal/stats`, apiKey],
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then(
        (
          r,
        ): Promise<{
          maxStreak: number;
          missingDates: string[];
          groupedMissingDays: {
            label: string;
            dates: { date: string; day: string }[];
          }[];
          allDays: number;
        }> => r.json(),
      );
    },
    { enabled: Boolean(apiKey) },
  );

  const groupedMissingDays = data?.groupedMissingDays || [];

  return (
    <>
      <NextSeo noindex nofollow title="Journal - Missing Dates" />
      <Heading as="h1">Stats</Heading>
      <AllDatesNumber allDatesNumber={data?.allDays} />
      <MaxStreak maxStreak={data?.maxStreak} />
      <MissingDatesNumber missingDatesNumber={data?.missingDates?.length} />
      <Heading as="h2">Missing Dates</Heading>
      <Flex sx={{ flexDirection: 'column' }}>
        {groupedMissingDays.map(({ label, dates }) => {
          return (
            <Flex
              key={label}
              sx={{
                flexDirection: 'column',
              }}
            >
              <Heading as="h3">{label}</Heading>
              <MissingDatesNumber missingDatesNumber={dates.length} />
              <Flex sx={{ gap: 3, flexWrap: 'wrap' }}>
                {dates
                  .sort((a, b) => (a.day > b.day ? 1 : -1))
                  .map(({ day, date }) => {
                    return (
                      <Flex
                        key={day}
                        onClick={() => {
                          router.push(`/journal/${date}`);
                        }}
                        sx={{
                          height: 48,
                          width: 48,
                          border: '1px solid',
                          borderColor: 'muted',
                          justifyContent: 'center',
                          alignItems: 'center',
                          ':hover': {
                            borderColor: 'primary',
                            color: 'primary',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <Text as="span">{day}</Text>
                      </Flex>
                    );
                  })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};

export default JournalStats;
