import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getDrafts, getDraft, Group } from '../../src/lib/files';

import HTMLHeaders from '../../src/components/HTMLHeaders';

const Post = dynamic(() => import('../../src/components/Post'));

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
    <HTMLHeaders
      noIndex
      title={draft.title}
      description={draft.excerpt}
      url={draft.href}
      keywords={draft.tags}
      image={draft.image || undefined}
    />
    <Post post={draft} />
  </>
);

export default DraftsSlug;
