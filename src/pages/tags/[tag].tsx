import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import { Box, Link, Themed } from 'theme-ui';

import HTMLHeaders from '../../components/HTMLHeaders';
import NetworkLink from '../../components/NetworkLink';
import RecommendationsList from '../../components/RecommendationsList';
import Tag from '../../components/Tag';

import { getAllTags, getPosts } from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllTags().map((tag) => ({
    params: { tag },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { tag },
}: {
  params: { tag: string };
}) => {
  const posts = getPosts({ tags: [tag] });
  return {
    props: { tag, posts },
  };
};

const TagsIndex = ({
  posts,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `#${tag}`;

  return (
    <>
      <HTMLHeaders keywords={[tag]} title={title} />
      <Themed.h1>{title}</Themed.h1>
      <Themed.p>
        Recommended posts related to the tag <Tag tag={tag} /> are shown below.{' '}
        <NetworkLink nodeId={tag} />
      </Themed.p>
      <Box sx={{ marginBottom: 5 }}>
        <NextLink href="/tags" passHref>
          <Link>See all tags</Link>
        </NextLink>
      </Box>
      <RecommendationsList recommendations={posts} />
    </>
  );
};

export default TagsIndex;
