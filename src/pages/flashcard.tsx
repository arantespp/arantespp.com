import * as React from 'react';
import { Box, Text, Themed } from 'theme-ui';
import { NextSeo } from 'next-seo';
import { useFlashcard } from '../hooks/useFlashcard';
import Flashcard from '../components/Flashcard';
import Loading from '../components/Loading';

const description =
  'Without opening the note, how would you explain it to a 12 years old child?';

const FetchFlashcard = () => {
  const { flashcard } = useFlashcard();

  return <>{flashcard && <Flashcard flashcard={flashcard} />}</>;
};

const FlashcardPage = () => {
  return (
    <>
      <NextSeo title="Flashcard" description={description} />
      <Themed.h1>Flashcard</Themed.h1>
      <Text sx={{ fontWeight: 'normal' }}>{description}</Text>
      <Box sx={{ marginTop: 4, marginBottom: 5 }}>
        <React.Suspense fallback={<Loading />}>
          <FetchFlashcard />
        </React.Suspense>
      </Box>
    </>
  );
};

export default FlashcardPage;
