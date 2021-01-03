import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Styled, Text } from 'theme-ui';

import {
  allPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../lib/files';

import Markdown from '../../components/Markdown';
import NotFound from '../../components/NotFound';
import PostResume from '../../components/PostResume';
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

  const { excerpt, image, href, title } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content={`https://arantespp.com${href}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={image?.url} />
      </Head>
      <Styled.h1>{title}</Styled.h1>
      <Box
        sx={{
          marginBottom: 4,
          borderWidth: 1,
          borderColor: 'muted',
          borderBottomStyle: 'solid',
        }}
      >
        <PostResume {...post} />
      </Box>
      {image && (
        <Box sx={{ marginBottom: 4 }}>
          <Image src={image.url} alt={image.alt} width={1000} height={500} />
          <Text
            as="span"
            sx={{
              fontSize: 1,
              fontStyle: 'italic',
              color: 'gray',
            }}
            dangerouslySetInnerHTML={{ __html: image.caption }}
          />
        </Box>
      )}
      <Markdown content={post.content} />
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default GroupSlug;
