import { useQuery } from 'react-query';
import { Box, Button, Flex, Text, Themed } from 'theme-ui';

import { Flashcard as FlashcardType } from '../../lib/getFlashcard';

import Flashcard from '../components/Flashcard';
import HTMLHeaders from '../components/HTMLHeaders';
import Loading from '../components/Loading';

const description =
  'Without opening the note, how would you explain it to a 12 years old child?';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const FlashcardPage = () => {
  const { data, status, refetch } = useQuery<{ flashcard: FlashcardType }>(
    '/api/flashcard',
    () => fetch('/api/flashcard').then((r) => r.json()),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  );

  const disabled = status === 'loading';

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
          disabled={disabled}
          onClick={() => refetch()}
          sx={{ display: 'none' }}
        >
          New Flashcard (N)
        </Button>
      </Flex>
    </>
  );
};

export default FlashcardPage;
