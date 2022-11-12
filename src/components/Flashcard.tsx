import { Flashcard as FlashcardType } from '../../lib/getFlashcard';
import { Text } from 'theme-ui';
import { fetch } from '../fetch';
import { useQuery } from 'react-query';
import Link from './Link';
import Loading from './Loading';
import RecommendationCard from './RecommendationCard';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useFlashcard = () => {
  const { data } = useQuery<{ flashcard: FlashcardType }>(
    '/api/flashcard',
    async () => fetch('/api/flashcard').then((r) => r.json()),
    {
      cacheTime: twentyFourHoursInMs,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: twentyFourHoursInMs,
      suspense: false,
    },
  );

  return { flashcard: data?.flashcard };
};

const description = 'How would you explain this note to a 12 years old child?';

const FetchFlashcard = () => {
  const { flashcard } = useFlashcard();

  if (!flashcard) {
    return <Loading />;
  }

  return <RecommendationCard recommendation={flashcard} />;
};

export const Flashcard = () => {
  return (
    <>
      <Text
        sx={{
          fontWeight: 'normal',
          marginY: 3,
          display: 'block',
          fontStyle: 'italic',
        }}
      >
        {description}
      </Text>
      <FetchFlashcard />
    </>
  );
};

Flashcard.description = description;
