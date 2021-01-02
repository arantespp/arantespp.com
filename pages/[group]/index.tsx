import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';

import {
  getGroups,
  getIndex,
  getRecommendations,
  Group,
} from '../../lib/files';

import IndexPage from '../../components/IndexPage';

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = getGroups();
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
  const content = getIndex(group) || '';
  const recommendations = getRecommendations({ group });
  return { props: { content, recommendations } };
};

const GroupIndex = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <IndexPage {...props} />;
};

export default GroupIndex;
