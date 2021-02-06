import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getDrafts, getDraft } from '../../lib/files';

import Post from '../../components/Post';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getDrafts().map(({ group, slug }) => ({
      params: { path: [group, slug] },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { path },
}: {
  params: { path: string[] };
}) => {
  const [group, slug] = path as any;
  const draft = getDraft({ group, slug });

  if (!draft) {
    throw new Error();
  }

  return { props: { path, draft } };
};

const DraftsSlug = ({
  draft,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="noindex,follow" />
        <meta key="googlebot" name="googlebot" content="noindex,follow" />
      </Head>
      <Post post={draft} />
    </>
  );
};

export default DraftsSlug;
