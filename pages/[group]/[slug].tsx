import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import {
  allPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../lib/files';

import NotFound from '../../components/NotFound';
import Post from '../../components/Post';
import Recommendations from '../../components/Recommendations';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map(({ group, slug }) => ({
      params: { group, slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group, slug },
}: {
  params: { group: Group; slug: string };
}) => {
  return { props: getPostAndPostsRecommendations({ slug, group }) };
};

const GroupSlug = ({
  post,
  recommendations,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <NotFound />;
  }

  const { excerpt, image, href, title, group } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:url"
          key="og:url"
          content={`https://arantespp.com${href}`}
        />
        <meta property="og:title" key="og:title" content={title} />
        <meta
          property="og:description"
          key="og:description"
          content={excerpt}
        />
        {group === 'zettelkasten' && (
          <meta
            property="og:image"
            key="og:image"
            content="https://source.unsplash.com/HOrhCnQsxnQ"
          />
        )}
        {image && (
          <meta property="og:image" key="og:image" content={image.url} />
        )}
      </Head>
      <Post post={post} />
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default GroupSlug;
