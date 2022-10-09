import * as React from 'react';
import { Flashcard } from '../components/Flashcard';
import { NextSeo } from 'next-seo';
import Heading from '../components/Heading';

const FlashcardPage = () => {
  return (
    <>
      <NextSeo title="Flashcard" description={Flashcard.description} />
      <Heading as="h1">Flashcard</Heading>
      <Flashcard />
    </>
  );
};

export default FlashcardPage;
