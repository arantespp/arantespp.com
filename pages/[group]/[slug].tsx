import { GetStaticProps, GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';

import {
  getPosts,
  getPostAndPostsRecommendations,
  Group,
  PostAndPostsRecommendations,
} from '../../lib/files';

const Post = dynamic(() => import('../../components/Post'));

type Props = PostAndPostsRecommendations;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ group, slug }) => ({
      params: { group, slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostAndPostsRecommendations> = async ({
  params: { group, slug },
}: {
  params: { group: Group; slug: string };
}) => {
  return { props: getPostAndPostsRecommendations({ slug, group, limit: 25 }) };
};

const GroupSlug = (props: Props) => {
  return <Post {...props} />;
};

export default GroupSlug;
