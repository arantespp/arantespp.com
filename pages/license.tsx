import { InferGetStaticPropsType } from 'next';

import { getFile } from '../src/lib/files';

import IndexPage from '../src/components/IndexPage';

export const getStaticProps = async () => {
  const { content = '' } = getFile('../LICENSE.md') || {};
  return { props: { content } };
};

const License = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <IndexPage content={content} recommendations={[]} />
);

export default License;
