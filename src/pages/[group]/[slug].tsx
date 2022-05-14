import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { Group, getPostAndRecommendations, getPosts } from '../../../lib/files';
import NotFound from '../../components/NotFound';
import Post from '../../components/Post';
import Recommendations from '../../components/Recommendations';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getPosts())
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
  props: await getPostAndRecommendations({ slug, group }),
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
