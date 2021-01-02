import { InferGetStaticPropsType } from 'next';

import { getIndex, getRecommendations } from '../lib/files';

import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const content = getIndex('.');
  const recommendations = getRecommendations();
  return { props: { content, recommendations } };
};
const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <IndexPage {...props} />;
};

export default Index;
