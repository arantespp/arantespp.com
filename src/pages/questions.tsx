import { InferGetStaticPropsType } from 'next';

import { getFile } from '../lib/files';

import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const { content } = getFile('questions.md') || '';
  return { props: { content } };
};

const Index = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <IndexPage content={content} recommendations={[]} />
);

export default Index;
