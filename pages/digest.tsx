import * as dateFns from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import { Box, Themed } from 'theme-ui';

import { allPosts, Post } from '../src/lib/files';
import { getClosestLastWeekDay } from '../src/lib/getClosestLastWeekDay';
import { getNextNewsletterDate } from '../src/lib/getNextNewsletterDate';

import HTMLHeaders from '../src/components/HTMLHeaders';
import Link from '../src/components/Link';
import RecommendationsList from '../src/components/RecommendationsList';

const getLastMonday = () => getClosestLastWeekDay('Mon');

/**
 * @param param.week used to pass all posts (week = `false`) on `getStaticProps`
 *  and filter only week posts (week = `true`) inside the component.
 *
 *  - If week is `true`, then it will return only posts of the
 *    week, that is, from the last Monday until the following Sunday.
 *  - If week is `false`, it'll return all posts since last Monday, even
 *    if some were written in subsequent Monday.
 *
 * @returns posts that will be used on my Weekly Digest.
 */
const filterDigestPosts =
  ({ week }: { week: boolean }) =>
  ({ date }: Post) => {
    const postDate = new Date(date);

    const postDateWithTimezone = dateFns.addMinutes(
      postDate,
      postDate.getTimezoneOffset(),
    );

    const diffInDays = dateFns.differenceInDays(
      postDateWithTimezone,
      getLastMonday(),
    );

    return diffInDays >= 0 && (diffInDays < 6 || !week);
  };

export const getStaticProps = async () => {
  const posts = allPosts
    .filter(filterDigestPosts({ week: false }))
    .sort(
      (postA, postB) =>
        dateFns.getUnixTime(new Date(postB.date)) -
        dateFns.getUnixTime(new Date(postA.date)),
    );

  return { props: { posts } };
};

const Digest = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const digestPosts = posts.filter(filterDigestPosts({ week: true }));

  return (
    <>
      <HTMLHeaders noIndex />
      <Themed.h1>Weekly Digest Posts</Themed.h1>
      <Themed.p>
        I&apos;ll use the posts below in my next{' '}
        <Link href="#newsletter">newsletter</Link>, whose release will be on{' '}
        {getNextNewsletterDate({ format: 'PPPPpppp' })}. These posts date from{' '}
        {dateFns.format(getLastMonday(), 'PPP')} (including) to{' '}
        {getNextNewsletterDate({ format: 'PPP' })} (excluding).
      </Themed.p>
      <Box sx={{ marginY: 5 }}>
        <RecommendationsList recommendations={digestPosts} />
      </Box>
    </>
  );
};

export default Digest;
