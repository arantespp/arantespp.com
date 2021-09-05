import { Card, Flex, Text } from 'theme-ui';

import { Flashcard as FlashcardType } from '../lib/getFlashcard';

import Link from './Link';
import RecommendationCard from './RecommendationCard';

const Flashcard = ({ flashcard }: { flashcard: FlashcardType }) => {
  return (
    <>
      <Flex sx={{ alignItems: 'center' }}>
        <Card variant="flashcard">
          <RecommendationCard recommendation={flashcard} />
        </Card>
      </Flex>
      <Text sx={{ fontSize: 1, fontStyle: 'italic', color: 'gray' }}>
        <Text>This note </Text>
        <Link href={flashcard.href}>
          <Link>{flashcard.title}</Link>
        </Link>
        <Text sx={{ fontWeight: 'bold' }}> </Text>
        <Text>has a difference from today equals to </Text>
        <Text sx={{ fontWeight: 'bold' }}>{flashcard.diffWeeks.weeks} </Text>
        <Text>{flashcard.diffWeeks.i18nWeeks} and </Text>
        <Text sx={{ fontWeight: 'bold' }}>{flashcard.diffWeeks.days} </Text>
        <Text>{flashcard.diffWeeks.i18nDays}.</Text>
      </Text>
    </>
  );
};

export default Flashcard;
