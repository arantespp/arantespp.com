import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { getInstagramPost, getInstagramPosts } from '../../../lib/instagram';
import InstagramPost from '../../components/InstagramPost';

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
}) => {
  const props = await getInstagramPost({ slug });

  if (!props) {
    return {
      notFound: true,
    };
  }

  return { props };
};

const InstagramSlug = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return <InstagramPost {...props} />;
};

export default InstagramSlug;
