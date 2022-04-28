import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getFile, getRecommendations, Group } from '../../../lib/files';

import IndexPage from '../../components/IndexPage';

export const getStaticPaths: GetStaticPaths = async () => {
  const files = ['blog', 'zettelkasten', 'now', 'me'];

  return {
    paths: files.map((file) => ({ params: { group: file } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group: file },
}: {
  params: { group: string };
}) => {
  const { data = {}, content = '' } = getFile(`${file}.md`) || {};
  const recommendations = getRecommendations({ all: true });
  const { image = null, excerpt = null } = data;
  return { props: { content, recommendations, title: file, excerpt, image } };
};

const GroupIndex = ({
  content,
  title,
  recommendations,
  excerpt,
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <IndexPage {...{ content, recommendations, title, excerpt, image }} />;
};

export default GroupIndex;
