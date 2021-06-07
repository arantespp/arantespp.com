import * as dateFns from 'date-fns';

import { getPosts } from './files';

export const INTERVAL = 7;

export const MAX_P_NUMBER = 1000;

/**
 * https://www.wolframalpha.com/input/?i=y+%3D+exp%28-x%2F%282**10+*+7%29%29*cos%28%28log2%28x%2F7%29*pi%29%29%5E10+%2C+from++6+%3C+x+%3C+2**10+*+7
 * @param x difference in days
 * @returns pNumber
 */
export const getPNumber = (x: number) =>
  Math.round(
    MAX_P_NUMBER *
      Math.exp(-(x / (2 ** 10 * INTERVAL))) *
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
    .filter(({ diffDays }) => diffDays >= INTERVAL - 1);
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Flashcard = ThenArg<ReturnType<typeof getFlashcards>>[number];

export const getFlashcardByProbability = (flashcards: Flashcard[]) => {
  const pNumberSum = flashcards.reduce((sum, { pNumber }) => sum + pNumber, 0);
  const random = Math.round(Math.random() * pNumberSum);

  const sortedFlashcards = flashcards.sort(
    (fa, fb) => fa.diffDays - fb.diffDays,
  );

  const meta = sortedFlashcards.reduce<[number, Flashcard | undefined]>(
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

  return meta[1] || sortedFlashcards[0];
};

export const getFlashcard = async () => {
  const flashcards = await getFlashcards();
  return getFlashcardByProbability(flashcards);
};
