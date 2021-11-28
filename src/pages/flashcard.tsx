import useSWR from 'swr';
import { Box, Button, Flex, Text, Themed } from 'theme-ui';

import { Flashcard as FlashcardType } from '../../lib/getFlashcard';

import Flashcard from '../components/Flashcard';
import HTMLHeaders from '../components/HTMLHeaders';
import Loading from '../components/Loading';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const description =
  'Without opening the note, how would you explain it to a 12 years old child?';

const FlashcardPage = () => {
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
          <Flashcard flashcard={data.flashcard} />
        ) : (
          <Loading />
        )}
      </Box>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Button
          disabled={isValidating}
          onClick={() => mutate()}
          sx={{ display: 'none' }}
        >
          New Flashcard (N)
        </Button>
      </Flex>
    </>
  );
};

export default FlashcardPage;
