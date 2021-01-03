import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Box, Styled } from 'theme-ui';

import {
  getPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../lib/files';

import Markdown from '../../components/Markdown';
import NotFound from '../../components/NotFound';
import PostResume from '../../components/PostResume';
import Recommendations from '../../components/Recommendations';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getPosts().map(({ group, slug }) => ({
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

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Styled.h1>{post.title}</Styled.h1>
      <Box sx={{ marginBottom: 4, paddingBottom: 3 }}>
        <PostResume {...post} />
      </Box>
      <Markdown content={post.content} />
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default GroupSlug;
