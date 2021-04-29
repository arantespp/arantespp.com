import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { getDrafts, getDraft, Group } from '../../lib/files';

import NoIndexHeaders from '../../components/NoIndexHeaders';
import Post from '../../components/Post';
import PostHeaders from '../../components/PostHeaders';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getDrafts().map(({ group, slug }) => ({
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
  const draft = getDraft({ group: group as Group, slug });

  if (!draft) {
    throw new Error();
  }

  return { props: { path, draft } };
};

const DraftsSlug = ({
  draft,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <PostHeaders post={draft} />
    <NoIndexHeaders />
    <Post post={draft} />
  </>
);

export default DraftsSlug;
