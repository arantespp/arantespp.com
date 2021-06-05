import * as dateFns from 'date-fns';
import { InferGetStaticPropsType } from 'next';
import { Box, Themed } from 'theme-ui';

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

  return dateFns.isAfter(postDateWithTimezone, getLastMonday());
};

export const getStaticProps = async () => {
  const posts = allPosts
    .filter(filterPostsSinceLastMonday)
    .sort(
      (postA, postB) =>
        dateFns.getUnixTime(new Date(postA.date)) -
        dateFns.getUnixTime(new Date(postB.date)),
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
        List of posts that will be used in my next{' '}
        <Themed.a href="https://www.getrevue.co/profile/arantespp">
          Revue weekly digest
        </Themed.a>
        , that will be released at{' '}
        <strong>{dateFns.format(nextDigestDate, 'PPPPpppp')}</strong>.
      </Themed.p>
      <Box sx={{ marginY: 5 }}>
        <Themed.em>
          Posts since {dateFns.format(getLastMonday(), 'PPPP')}:
        </Themed.em>
        <RecommendationsList recommendations={postsSinceLastMonday} />
      </Box>
    </>
  );
};

export default Revue;
