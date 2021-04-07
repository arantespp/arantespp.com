import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getDrafts, getDraft, Group } from '../../lib/files';

import Post from '../../components/Post';
import PostHead from '../../components/PostHead';

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
    <PostHead post={draft} />
    <Head>
      <meta key="robots" name="robots" content="noindex,follow" />
      <meta key="googlebot" name="googlebot" content="noindex,follow" />
    </Head>
    <Post post={draft} />
  </>
);

export default DraftsSlug;
