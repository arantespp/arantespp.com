import * as dateFns from 'date-fns';
import { URL } from 'url';

import { db } from './database';
import { getFlashcard } from './getFlashcard';
import { getClosestLastWeekDay } from './getClosestLastWeekDay';
import { socialMedias } from './socialMedias';

const getLastSunday = () => {
  const format = 'yyyy-MM-dd';
  const lastSunday = getClosestLastWeekDay('Sun');
  return dateFns.format(lastSunday, format);
};

const generateTwitterSearchUrl = () => {
  const searchUrl = new URL('https://twitter.com/search');

  const searchObject = {
    from: socialMedias.Twitter.username,
    since: getLastSunday(),
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
  const lastSunday = getLastSunday();

  db.push(`/newsletter/${lastSunday}`, { items }, false);

  return 'ads';
};
