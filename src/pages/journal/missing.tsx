import * as React from 'react';
import { Flex, Text } from 'theme-ui';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Heading from '../../components/Heading';

const MissingDatesNumber = ({
  missingDatesNumber = 0,
}: {
  missingDatesNumber?: number;
}) => {
  return (
    <Text
      sx={{
        marginBottom: 3,
        color: 'gray',
        fontStyle: 'italic',
      }}
    >
      {missingDatesNumber} missing dates.
    </Text>
  );
};

const JournalMissingDates = () => {
  const router = useRouter();

  const { apiKey } = useApiKey();

  const { data } = useQuery(
    [`/api/journal/missing`, apiKey],
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then(
        (
          r,
        ): Promise<{
          missingDates: string[];
          groupedMissingDays: {
            label: string;
            dates: { date: string; day: string }[];
          }[];
        }> => r.json(),
      );
    },
    { enabled: Boolean(apiKey) },
  );

  const groupedMissingDays = data?.groupedMissingDays || [];

  return (
    <>
      <NextSeo noindex nofollow title="Journal - Missing Dates" />
      <Heading as="h1">Missing Dates</Heading>
      <MissingDatesNumber missingDatesNumber={data?.missingDates?.length} />
      <Flex sx={{ gap: 3, flexDirection: 'column' }}>
        {groupedMissingDays.map(({ label, dates }) => {
          return (
            <Flex
              key={label}
              sx={{
                flexDirection: 'column',
              }}
            >
              <Heading as="h2">{label}</Heading>
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

export default JournalMissingDates;
