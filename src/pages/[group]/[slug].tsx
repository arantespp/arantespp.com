import { GetStaticPaths } from 'next';
import { PostPage } from '../../components/PostPage';
import { zettelkasten } from '../../../lib/zettelkasten';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (
    await zettelkasten.getPosts({ groups: ['/zettel', '/books'] })
  ).map(({ group, slug }) => ({
    params: { group: group.replace('/', ''), slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group, slug },
}: {
  params: { group: string; slug: string };
}) => {
  const post = await zettelkasten.getPost({
    slug,
    group: `/${group}`,
  });

  if (!post) {
    throw new Error();
  }

  return {
    props: { post, recommendations: post.recommendations },
  };
};

export default PostPage;
