import { InferGetStaticPropsType } from 'next';

import { getFile } from '../../lib/files';

import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const { content = '' } = getFile('blogs.md') || {};
  return { props: { content } };
};

const Blogs = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <IndexPage content={content} recommendations={[]} />;
};

export default Blogs;
