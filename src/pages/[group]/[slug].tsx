import { GetStaticPaths } from 'next';
import { Group, getPostAndRecommendations, getPosts } from '../../../lib/files';
import { PostPage } from '../../components/PostPage';
import { zettelkasten } from '../../../lib/zettelkasten';

export const getStaticPaths: GetStaticPaths = async () => {
  const p = (
    await zettelkasten.getPosts({ groups: ['/zettel', '/books'] })
  ).map(({ group, slug }) => ({
    params: { group: group.replace('/', ''), slug },
  }));

  const paths = (await getPosts())
    .filter(({ group }) => group !== 'blog')
    .map(({ group, slug }) => ({
      params: { group, slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

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
