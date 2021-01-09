import { InferGetStaticPropsType } from 'next';

import { getFile, getRecommendations } from '../lib/files';

import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const content = getFile('../README.md');
  const recommendations = getRecommendations({ all: true });
  return { props: { content, recommendations } };
};
const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <IndexPage {...props} />;
};

export default Index;
