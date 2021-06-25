import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getInstagramPosts, getInstagramPost } from '../../lib/files';

const InstagramPost = dynamic(() => import('../../components/InstagramPost'));

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getInstagramPosts()).map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => ({ props: await getInstagramPost({ slug }) });

const InstagramSlug = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return <InstagramPost {...props} />;
};

export default InstagramSlug;
