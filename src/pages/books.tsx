import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { getDrafts, getPosts } from '../../lib/files';
import Heading from '../components/Heading';
import RecommendationsList from '../components/RecommendationsList';

export const getStaticProps = async () => {
  const books = (await getPosts({ group: 'books' })).map(
    ({ content, ...rest }) => ({ ...rest }),
  );

  const drafts = (await getDrafts({ group: 'books' })).map(
    ({ content, ...rest }) => ({ ...rest }),
  );

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
