import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getFile, getRecommendations } from '../lib/files';

import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const content = getFile('index.md');
  const recommendations = getRecommendations({ all: true });
  return { props: { content, recommendations } };
};
const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Pedro Arantes' Blog</title>
        <meta property="og:url" content="https://arantespp.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pedro Arantes blog" />
        <meta
          property="og:description"
          content="I use this blog as a online note of the subjects I study about."
        />
        <meta property="og:image" content="/me.jpg" />
      </Head>
      <IndexPage {...props} />
    </>
  );
};

export default Index;
