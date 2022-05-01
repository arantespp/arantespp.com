import * as dateFns from 'date-fns';
import { Group } from './groups';
import { getPosts } from './filesv2';
import { getWeightedRandomInt } from './getRandomInt';

export const INTERVAL = 7;

export const MAX_P_NUMBER = 1000;

/**
 * https://www.wolframalpha.com/input/?i=y+%3D+exp%28-x%2F%282**5+*+7%29%29*cos%28%28log2%28x%2F7%29*pi%29%29%5E10+%2C+from++6+%3C+x+%3C+2**6+*+7
 * @param x difference in days
 * @returns pNumber
 */
export const getPNumber = (x: number) =>
  Math.round(
    MAX_P_NUMBER *
      Math.exp(-(x / (2 ** 5 * INTERVAL))) *
      Math.cos((Math.log(x / INTERVAL) / Math.log(2)) * Math.PI) ** 10,
  );

export const getFlashcards = async () => {
  const today = new Date();

  const excludedGroups: Group[] = ['blog'];

  return (await getPosts())
    .filter((post) => !excludedGroups.includes(post.group))
    .map((post) => {
      const diffDays = dateFns.differenceInDays(today, new Date(post.date));

      const diffWeeks = (() => {
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        const i18nWeeks = weeks === 1 ? 'week' : 'weeks';
        const i18nDays = days === 1 ? 'day' : 'days';
        return { weeks, i18nWeeks, days, i18nDays };
      })();

      return {
        ...post,
        diffDays,
        pNumber: getPNumber(diffDays),
        diffWeeks,
      };
    })
    .filter(({ diffDays }) => diffDays >= INTERVAL - 1);
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Flashcard = ThenArg<ReturnType<typeof getFlashcards>>[number];

export const getFlashcardByProbability = (flashcards: Flashcard[]) => {
  const sortedFlashcards = flashcards.sort(
    (fa, fb) => fa.diffDays - fb.diffDays,
  );

  const weights = sortedFlashcards.map(({ pNumber }) => pNumber);

  return sortedFlashcards[getWeightedRandomInt(weights)];
};

export const getFlashcard = async () => {
  const flashcards = await getFlashcards();
  return getFlashcardByProbability(flashcards);
};
