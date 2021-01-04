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
  return <IndexPage {...props} />;
};

export default Index;
