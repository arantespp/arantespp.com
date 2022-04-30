import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import { getInstagramPost, getInstagramPosts } from '../../../lib/files';

import NotFound from '../../components/NotFound';

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
  if (!props) {
    return <NotFound />;
  }

  return <InstagramPost {...props} />;
};

export default InstagramSlug;
