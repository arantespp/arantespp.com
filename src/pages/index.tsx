import { Box } from 'theme-ui';
import { Flashcard } from '../components/Flashcard';
import { InferGetStaticPropsType } from 'next';
import { PostPage } from '../components/PostPage';
import { getRecommendations, readMarkdownFile } from '../../lib/files';
import Heading from '../components/Heading';

export const getStaticProps = async () => {
  const { content = '' } = (await readMarkdownFile('index.md')) || {};

  const seo = {
    title: "Pedro's Blog",
    openGraph: { images: [{ url: 'https://arantespp.com/me.webp' }] },
  };

  const recommendations = await getRecommendations();

  return { props: { recommendations, seo, content } };
};

const Index = (
  postPageProps: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <>
      <PostPage {...postPageProps} />
      <Heading as="h2">Flashcard</Heading>
      <Flashcard />
    </>
  );
};

export default Index;
