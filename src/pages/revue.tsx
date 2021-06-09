import * as dateFns from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import { Box, Text, Themed } from 'theme-ui';

import { allPosts, Post } from '../lib/files';
import { getClosestLastWeekDay } from '../lib/getClosestLastWeekDay';

import HTMLHeaders from '../components/HTMLHeaders';
import RecommendationsList from '../components/RecommendationsList';

const getLastMonday = () => getClosestLastWeekDay('Mon');

/**
 * @param param.week used to pass all posts (week = `false`) on `getStaticProps`
 *  and filter only week posts (week = `true`) inside the component.
 *
 *  - If week is `true`, then it will return only posts of the
 *    week, that is, from the last Monday until the following Sunday (Revue).
 *  - If week is `false`, it'll return all posts since last Monday, even
 *    if some were written in subsequent Monday.
 *
 * @returns posts that will be used on Revue Weekly Digest.
 */
const filterRevuePosts =
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
    .filter(filterRevuePosts({ week: false }))
    .sort(
      (postA, postB) =>
        dateFns.getUnixTime(new Date(postB.date)) -
        dateFns.getUnixTime(new Date(postA.date)),
    );

  return { props: { posts } };
};

const Revue = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const revuePosts = posts.filter(filterRevuePosts({ week: true }));

  const nextDigestDate = dateFns.set(
    dateFns.add(getLastMonday(), { days: 7 }),
    { hours: 22, minutes: -getLastMonday().getTimezoneOffset(), seconds: 0 },
  );

  return (
    <>
      <HTMLHeaders noIndex />
      <Themed.h1>Revue Weekly Digest Posts</Themed.h1>
      <Themed.p>
        I&apos;ll use the posts below in my next{' '}
        <Themed.a href="https://www.getrevue.co/profile/arantespp">
          Revue weekly digest
        </Themed.a>
        , whose release will be on{' '}
        <strong>{dateFns.format(nextDigestDate, 'PPPPpppp')}</strong>.
      </Themed.p>
      <Box sx={{ marginY: 5 }}>
        <Text sx={{ fontSize: 1, color: 'gray', fontStyle: 'italic' }}>
          Posts since {dateFns.format(getLastMonday(), 'PPPP')}:
        </Text>
        <RecommendationsList recommendations={revuePosts} />
      </Box>
    </>
  );
};

export default Revue;
