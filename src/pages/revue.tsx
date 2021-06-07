import * as dateFns from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import { Box, Text, Themed } from 'theme-ui';

import { allPosts, Post } from '../lib/files';
import { getClosestLastWeekDay } from '../lib/getClosestLastWeekDay';

import HTMLHeaders from '../components/HTMLHeaders';
import RecommendationsList from '../components/RecommendationsList';

const getLastMonday = () => getClosestLastWeekDay('Mon');

const filterPostsSinceLastMonday = ({ date }: Post) => {
  const postDate = new Date(date);

  const postDateWithTimezone = dateFns.addMinutes(
    postDate,
    postDate.getTimezoneOffset(),
  );

  const diffInDays = dateFns.differenceInDays(
    postDateWithTimezone,
    getLastMonday(),
  );

  return diffInDays >= 0 && diffInDays < 6;
};

export const getStaticProps = async () => {
  const posts = allPosts
    .filter(filterPostsSinceLastMonday)
    .sort(
      (postA, postB) =>
        dateFns.getUnixTime(new Date(postB.date)) -
        dateFns.getUnixTime(new Date(postA.date)),
    );

  return { props: { posts } };
};

const Revue = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const postsSinceLastMonday = posts.filter(filterPostsSinceLastMonday);

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
        <RecommendationsList recommendations={postsSinceLastMonday} />
      </Box>
    </>
  );
};

export default Revue;
