import * as dateFns from 'date-fns';
import { URL } from 'url';

import { db } from './database';
import { getFlashcard } from './getFlashcard';
import { getClosestLastWeekDay } from './getClosestLastWeekDay';
import { socialMedias } from './socialMedias';

const format = 'yyyy-MM-dd';

const SUBTRACT_MONTHS = 3;

const getDateRange = () => {
  const lastSunday = getClosestLastWeekDay('Sun');

  const since = dateFns.subMonths(lastSunday, SUBTRACT_MONTHS);

  const until = dateFns.addWeeks(since, 1);

  return {
    since: dateFns.format(since, format),
    until: dateFns.format(until, format),
  };
};

const generateTwitterSearchUrl = () => {
  const searchUrl = new URL('https://twitter.com/search');

  const searchObject = {
    from: socialMedias.Twitter.username,
    ...getDateRange(),
    '-filter': 'replies',
  };

  const q = Object.entries(searchObject)
    .map(([key, value]) => `${key}:${value}`)
    .join(' ');

  searchUrl.searchParams.append('q', q);

  return { href: searchUrl.href, ...searchObject };
};

/**
 * Data that is used to generate the newsletter.
 */
export const getNewsletterData = async () => {
  return {
    flashcard: await getFlashcard(),
    twitterSearchUrl: generateTwitterSearchUrl(),
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type NewsletterData = ThenArg<ReturnType<typeof getNewsletterData>>;

export const saveNewsletterItems = async (items: any) => {
  db.push(`/newsletter/TODO`, { items }, false);

  return 'TODO';
};
