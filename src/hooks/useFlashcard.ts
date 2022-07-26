import { Flashcard as FlashcardType } from '../../lib/getFlashcard';
import { fetch } from '../fetch';
import { useQuery } from 'react-query';

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
