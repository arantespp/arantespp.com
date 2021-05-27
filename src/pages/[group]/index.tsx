import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getGroups, getFile, getRecommendations, Group } from '../../lib/files';

import IndexPage from '../../components/IndexPage';

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = [...getGroups(), 'now'];
  return {
    paths: groups.map((group) => ({ params: { group } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group },
}: {
  params: { group: Group };
}) => {
  const { data, content } =
    getFile(`${group}/index.md`) || getFile(`${group}.md`) || '';
  const recommendations = getRecommendations({ group });
  const { image = null, excerpt = null } = data;
  return { props: { content, recommendations, group, excerpt, image } };
};

const GroupIndex = ({
  content,
  group,
  recommendations,
  excerpt,
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <IndexPage {...{ content, recommendations, group, excerpt, image }} />
);

export default GroupIndex;
