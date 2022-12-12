import { GetStaticPaths } from 'next';
import { Group, getPostAndRecommendations, getPosts } from '../../../lib/files';
import { PostPage } from '../../components/PostPage';

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
}) => {
  const { post, recommendations } = await getPostAndRecommendations({
    slug,
    group,
  });

  if (!post) {
    throw new Error();
  }

  return {
    props: { post, recommendations },
  };
};

export default PostPage;
