import { Flashcard as FlashcardType } from '../../lib/getFlashcard';
import { Flex, Text } from 'theme-ui';
import Link from './Link';
import RecommendationCard from './RecommendationCard';

const Flashcard = ({ flashcard }: { flashcard: FlashcardType }) => {
  return (
    <Flex sx={{ flexDirection: 'column', marginY: 5 }}>
      <RecommendationCard recommendation={flashcard} />
      <Flex sx={{ width: '100%', justifyContent: 'flex-end' }}>
        <Text
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
            color: 'gray',
            textAlign: 'right',
          }}
        >
          <Text>The note </Text>
          <Link href={flashcard.href}>{flashcard.title}</Link>
          <Text sx={{ fontWeight: 'bold' }}> </Text>
          <Text>is </Text>
          <Text sx={{ fontWeight: 'bold' }}>{flashcard.diffWeeks.weeks} </Text>
          <Text>{flashcard.diffWeeks.i18nWeeks} and </Text>
          <Text sx={{ fontWeight: 'bold' }}>{flashcard.diffWeeks.days} </Text>
          <Text>{flashcard.diffWeeks.i18nDays}</Text>
          <Text> old.</Text>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Flashcard;
