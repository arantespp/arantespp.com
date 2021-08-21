import { InferGetStaticPropsType } from 'next';

import { getFile, getRecommendations } from '../src/lib/files';

import IndexPage from '../src/components/IndexPage';

export const getStaticProps = async () => {
  const { content = '' } = getFile('../posts/index.md') || {};
  const recommendations = getRecommendations({ all: true });
  return { props: { content, recommendations } };
};

const Index = ({
  content,
  recommendations,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <IndexPage content={content} recommendations={recommendations} />
);

export default Index;
