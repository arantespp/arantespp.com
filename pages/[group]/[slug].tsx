import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Box, Flex, Image, Styled, Text } from 'theme-ui';

import {
  allPosts,
  getPostAndPostsRecommendations,
  Group,
} from '../../lib/files';

import CustomImage from '../../components/CustomImage';
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://arantespp.com${href}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        {image && (
          <meta
            property="og:image"
            content={`https://arantespp.com${image.url}`}
          />
        )}
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
      {!!image && <CustomImage {...image} src={image.url} />}
      <Markdown content={post.content} />
      <Flex sx={{ justifyContent: 'center', marginTop: 5, marginBottom: 5 }}>
        <Image sx={{ height: '1.5em', marginLeft: 1 }} src="/rose.png" />
      </Flex>
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default GroupSlug;
