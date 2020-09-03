import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';

import {
  getGroups,
  getPostAndPostsRecommendations,
  Group,
  PostAndPostsRecommendations,
} from '../../lib/files';

const Post = dynamic(() => import('../../components/Post'));

type Props = PostAndPostsRecommendations;

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = getGroups();
  return {
    paths: groups.map((group) => ({ params: { group } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostAndPostsRecommendations> = async ({
  params: { group },
}: {
  params: { group: Group };
}) => {
  return { props: getPostAndPostsRecommendations({ slug: 'index', group }) };
};

const GroupIndex = (props: Props) => {
  return <Post {...props} />;
};

export default GroupIndex;
