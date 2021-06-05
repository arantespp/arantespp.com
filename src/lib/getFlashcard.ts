import * as dateFns from 'date-fns';

import { getPosts } from './files';

export const INTERVAL = 7;

export const MAX_P_NUMBER = 1000;

export const getPNumber = (x: number) =>
  Math.round(
    MAX_P_NUMBER *
      Math.cos((Math.log(x / INTERVAL) / Math.log(2)) * Math.PI) ** 10,
  );

export const getFlashcards = async () => {
  const today = new Date();

  return getPosts({ group: 'zettelkasten' })
    .map((post) => {
      const diffDays = dateFns.differenceInDays(today, new Date(post.date));
      return {
        ...post,
        diffDays,
        pNumber: getPNumber(diffDays),
      };
    })
    .filter(({ diffDays }) => diffDays >= INTERVAL - 1)
    .sort((fa, fb) => fb.diffDays - fa.diffDays);
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Flashcard = ThenArg<ReturnType<typeof getFlashcards>>[number];

export const getFlashcardByProbability = (flashcards: Flashcard[]) => {
  const pNumberSum = flashcards.reduce((sum, { pNumber }) => sum + pNumber, 0);
  const random = Math.round(Math.random() * pNumberSum);

  const meta = flashcards.reduce<[number, Flashcard | undefined]>(
    ([sum, flashcard], currentFlashcard) => {
      if (flashcard) {
        return [sum, flashcard];
      }

      if (sum + currentFlashcard.pNumber >= random) {
        return [0, currentFlashcard];
      }

      return [sum + currentFlashcard.pNumber, undefined];
    },
    [0, undefined],
  );

  return meta[1] || flashcards[0];
};

export const getFlashcard = async () => {
  const flashcards = await getFlashcards();
  return getFlashcardByProbability(flashcards);
};
