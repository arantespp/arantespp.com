import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getPostsByGroup, getDrafts } from '../lib/files';

import CustomImage from '../components/CustomImage';
import Heading from '../components/Heading';
import HTMLHeaders from '../components/HTMLHeaders';
import RecommendationsList from '../components/RecommendationsList';

export const getStaticProps = async () => {
  const books = getPostsByGroup('books');
  const drafts = getDrafts({ group: 'books' });
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
