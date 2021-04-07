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
  const content = getFile(`${group}/index.md`) || getFile(`${group}.md`) || '';
  const recommendations = getRecommendations({ group });
  return { props: { content, recommendations } };
};

const GroupIndex = ({
  content,
  recommendations,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <IndexPage {...{ content, recommendations }} />
);

export default GroupIndex;
