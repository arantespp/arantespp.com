import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';

import {
  // allPosts,
  getInstagramPosts,
  getInstagramPost,
  // Group,
} from '../../lib/files';

const InstagramPost = dynamic(() => import('../../components/InstagramPost'));
// const NotFound = dynamic(() => import('../../components/NotFound'));
// const Recommendations = dynamic(
//   () => import('../../components/Recommendations'),
// );

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

const GroupSlug = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // if (!post) {
  //   return <NotFound />;
  // }

  return <InstagramPost {...props} />;
};

export default GroupSlug;
