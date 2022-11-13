import * as dateFns from 'date-fns';
import { URL } from 'url';
import { getClosestLastWeekDay } from './getClosestLastWeekDay';
import { getPosts } from './files';
import { socialMedias } from './socialMedias';

const format = 'yyyy-MM-dd';

const formatDate = (date: Date) => dateFns.format(date, 'MMMM do');

const getDateRange = () => {
  const fromDay = getClosestLastWeekDay('Fri');

  const since = fromDay;

  const until = dateFns.addWeeks(since, 1);

  return {
    since: dateFns.format(since, format),
    formattedSince: formatDate(since),
    until: dateFns.format(until, format),
    formattedUntil: formatDate(until),
  };
};

const generateTwitterSearchUrl = () => {
  const searchUrl = new URL('https://twitter.com/search');

  const { since, until } = getDateRange();

  const searchObject = {
    from: socialMedias.Twitter.username,
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

const getPostsSince = async () => {
  const { since } = getDateRange();

  /**
   * All posts since `since` date.
   */
  const posts = await getPosts();

  return posts.filter((post) => post.date >= since);
};

/**
 * Data that is used to generate the newsletter.
 */
export const getNewsletterContent = async () => {
  const { formattedSince, formattedUntil } = getDateRange();

  return {
    formattedSince,
    formattedUntil,
    posts: await getPostsSince(),
    twitterSearchUrl: generateTwitterSearchUrl(),
  };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type NewsletterContent = ThenArg<
  ReturnType<typeof getNewsletterContent>
>;
