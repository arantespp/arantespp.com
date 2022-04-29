import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { getPostsByGroup, getDrafts, Post } from '../../lib/files';

import Heading from '../components/Heading';
import RecommendationsList from '../components/RecommendationsList';

const sortBooksMostRecentFirst = (a: Post, b: Post) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateRegex.test(a.date) && dateRegex.test(b.date)) {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date > b.date) {
      return -1;
    }
  }

  /**
   * If the dates are not in the format YYYY-MM-DD, because it is a draft.
   */
  if (!dateRegex.test(a.date)) {
    return 2;
  }

  if (!dateRegex.test(b.date)) {
    return -2;
  }

  return 0;
};

export const getStaticProps = async () => {
  const books = getPostsByGroup('books').sort(sortBooksMostRecentFirst);
  const drafts = getDrafts({ group: 'books' }).sort(sortBooksMostRecentFirst);
  return { props: { books, drafts } };
};

const GroupIndex = ({
  books,
  drafts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo title="Books" />
      <Heading level={1}>Books</Heading>
      <RecommendationsList recommendations={books} />
      <Heading level={2}>Drafts</Heading>
      <RecommendationsList recommendations={drafts} />
    </>
  );
};

export default GroupIndex;
