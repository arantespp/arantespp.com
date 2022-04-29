import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import {
  allPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../../lib/files';

const Post = dynamic(() => import('../../components/Post'));
const NotFound = dynamic(() => import('../../components/NotFound'));
const Recommendations = dynamic(
  () => import('../../components/Recommendations'),
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: allPosts
    .filter(({ group }) => group !== 'blog')
    .map(({ group, slug }) => ({
      params: { group, slug },
    })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { group, slug },
}: {
  params: { group: Group; slug: string };
}) => ({
  props: getPostAndPostsRecommendations({ slug, group }),
});

const GroupSlug = ({
  post,
  recommendations,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <Post post={post} />
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default GroupSlug;
