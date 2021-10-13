import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getPostsByGroup, getDrafts, Post } from '../src/lib/files';

import CustomImage from '../src/components/CustomImage';
import Heading from '../src/components/Heading';
import HTMLHeaders from '../src/components/HTMLHeaders';
import RecommendationsList from '../src/components/RecommendationsList';

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
  const image = {
    alt: 'Photo by <a href="https://unsplash.com/@qmikola?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mikołaj</a> on <a href="https://unsplash.com/s/photos/book?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
    src: 'https://arantespp.com/images/mikolaj-DCzpr09cTXY-unsplash.jpg',
  };
  return (
    <>
      <Head>
        <HTMLHeaders
          title="Books"
          image={{ url: image.src }}
          keywords={['books']}
        />
      </Head>
      <Heading level={1}>Books</Heading>
      <CustomImage {...image} />
      <RecommendationsList recommendations={books} />
      <Heading level={2}>Drafts</Heading>
      <RecommendationsList recommendations={drafts} />
    </>
  );
};

export default GroupIndex;
