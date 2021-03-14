import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import {
  allPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../lib/files';

import Digest from '../../components/Digest';
import NotFound from '../../components/NotFound';
import Post from '../../components/Post';
import Recommendations from '../../components/Recommendations';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map(({ group, slug }) => ({
      params: { group, slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group, slug },
}: {
  params: { group: Group; slug: string };
}) => {
  return { props: getPostAndPostsRecommendations({ slug, group }) };
};

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
      <Digest />
    </>
  );
};

export default GroupSlug;
