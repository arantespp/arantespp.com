import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { Group, getDraft, getDrafts } from '../../../lib/files';
import { NextSeo } from 'next-seo';
import Post from '../../components/Post';

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

  return { props: { path, draft } };
};

const DraftsSlug = ({
  draft,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <NextSeo
      {...{
        nofollow: true,
        noindex: true,
        title: draft.title,
        description: draft.excerpt,
        openGraph: {
          url: `https://arantespp.com${draft.href}`,
        },
      }}
    />
    <Post post={draft} />
  </>
);

export default DraftsSlug;
