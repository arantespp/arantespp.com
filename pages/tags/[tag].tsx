import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { Flex, Themed } from 'theme-ui';

import HTMLHeaders from '../../src/components/HTMLHeaders';
import Link from '../../src/components/Link';
import NetworkLink from '../../src/components/NetworkLink';
import RecommendationsList from '../../src/components/RecommendationsList';
import Tag from '../../src/components/Tag';

import { getAllTags, getPosts } from '../../src/lib/files';

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
        {posts.length} posts related to the tag <Tag tag={tag} /> are shown
        below.{' '}
        <Link href="/tags">
          Click here if you want to see all tags instead.
        </Link>
      </Themed.p>
      <Flex sx={{ flexDirection: 'column', marginY: 3 }}>
        <NetworkLink nodeId={tag} />
      </Flex>
      <RecommendationsList recommendations={posts} />
    </>
  );
};

export default TagsIndex;
