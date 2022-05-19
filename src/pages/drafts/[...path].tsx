import { GetStaticPaths } from 'next';
import { Group, getDraft, getDrafts } from '../../../lib/files';
import { PostPage } from '../../components/PostPage';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getDrafts()).map(({ group, slug }) => ({
    params: { path: [group, slug] },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { path },
}: {
  params: { path: string[] };
}) => {
  const [group, slug] = path;
  const draft = await getDraft({ group: group as Group, slug });

  if (!draft) {
    throw new Error();
  }

  return { props: { seo: { nofollow: true, noindex: true }, post: draft } };
};

export default PostPage;
