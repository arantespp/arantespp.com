import { Box, Text, Themed } from 'theme-ui';
import { Flashcard as FlashcardType } from '../../lib/getFlashcard';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import Flashcard from '../components/Flashcard';
import Loading from '../components/Loading';
import React from 'react';

const description =
  'Without opening the note, how would you explain it to a 12 years old child?';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const FetchFlashcard = () => {
  const { data } = useQuery<{ flashcard: FlashcardType }>(
    '/api/flashcard',
    async () => fetch('/api/flashcard').then((r) => r.json()),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  );

  return (
    <Box sx={{ marginTop: 4, marginBottom: 5 }}>
      {data?.flashcard && <Flashcard flashcard={data.flashcard} />}
    </Box>
  );
};

const FlashcardPage = () => {
  return (
    <>
      <NextSeo title="Flashcard" description={description} />
      <Themed.h1>Flashcard</Themed.h1>
      <Text sx={{ fontWeight: 'normal' }}>{description}</Text>
      <React.Suspense fallback={<Loading />}>
        <FetchFlashcard />
      </React.Suspense>
    </>
  );
};

export default FlashcardPage;
