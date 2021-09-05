import * as dateFns from 'date-fns';
import { URL } from 'url';

import { getFlashcard } from './getFlashcard';
import { getNextNewsletterDate } from './getNextNewsletterDate';

import { socialMedias } from './socialMedias';

const generateTwitterSearchUrl = () => {
  const searchUrl = new URL('https://twitter.com/search');

  const format = 'yyyy-MM-dd';

  const until = getNextNewsletterDate({ format });

  const since = dateFns.format(
    dateFns.subDays(dateFns.parseISO(until), 7),
    format,
  );

  const searchObject = {
    from: socialMedias.Twitter.username,
    lang: 'en',
    since,
    until,
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
