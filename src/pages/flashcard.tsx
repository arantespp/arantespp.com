import NextLink from 'next/link';
import useSWR from 'swr';
import { Box, Button, Card, Flex, Link, Text, Themed } from 'theme-ui';

import { Flashcard as FlashcardType } from '../lib/getFlashcard';

import HTMLHeaders from '../components/HTMLHeaders';
import Loading from '../components/Loading';
import RecommendationCard from '../components/RecommendationCard';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const description =
  'Without opening the note, how would you explain it to a 12 years old child?';

const FlashcardSection = ({ flashcard }: { flashcard: FlashcardType }) => {
  const weeks = Math.floor(flashcard.diffDays / 7);
  const days = flashcard.diffDays % 7;

  const i18nWeeks = weeks === 1 ? 'week' : 'weeks';
  const i18nDays = days === 1 ? 'day' : 'days';

  return (
    <>
      <Flex sx={{ alignItems: 'center' }}>
        <Card variant="flashcard">
          <RecommendationCard recommendation={flashcard} />
        </Card>
      </Flex>
      <Text sx={{ fontSize: 1, fontStyle: 'italic', color: 'gray' }}>
        <Text>Note </Text>
        <NextLink href={flashcard.href} passHref>
          <Link>{flashcard.title}</Link>
        </NextLink>
        <Text sx={{ fontWeight: 'bold' }}> </Text>
        <Text>has a difference from today equals to </Text>
        <Text sx={{ fontWeight: 'bold' }}>{weeks} </Text>
        <Text>{i18nWeeks} and </Text>
        <Text sx={{ fontWeight: 'bold' }}>{days} </Text>
        <Text>{i18nDays}.</Text>
      </Text>
    </>
  );
};

const Flashcard = () => {
  const { data, isValidating, mutate } = useSWR<{ flashcard: FlashcardType }>(
    '/api/flashcard',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return (
    <>
      <HTMLHeaders
        title="Flashcard"
        description={description}
        image={{ url: '/images/amanda-jones-feLC4ZCxGqk-unsplash.jpg' }}
        url="/flashcard"
      />
      <Themed.h1>Flashcard</Themed.h1>
      <Text sx={{ fontWeight: 'normal' }}>{description}</Text>
      <Box sx={{ marginTop: 4, marginBottom: 5 }}>
        {data?.flashcard ? (
          <FlashcardSection flashcard={data.flashcard} />
        ) : (
          <Loading />
        )}
      </Box>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Button disabled={isValidating} onClick={() => mutate()}>
          New Flashcard
        </Button>
      </Flex>
    </>
  );
};

export default Flashcard;
