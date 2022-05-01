import { Flex, Themed } from 'theme-ui';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { getAllTags, getPosts, getRecommendations } from '../../../lib/files';
import Link from '../../components/Link';
import NetworkLink from '../../components/NetworkLink';
import RecommendationsList from '../../components/RecommendationsList';
import Tag from '../../components/Tag';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getAllTags()).map((tag) => ({
    params: { tag },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { tag },
}: {
  params: { tag: string };
}) => {
  const recommendations = await getRecommendations({ tag });
  return {
    props: { tag, recommendations },
  };
};

const TagsIndex = ({
  recommendations,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `#${tag}`;

  return (
    <>
      <NextSeo title={title} />
      <Themed.h1>{title}</Themed.h1>
      <Themed.p>
        {recommendations.length} posts related to the tag <Tag tag={tag} /> are
        shown below.{' '}
        <Link href="/tags">
          Click here if you want to see all tags instead.
        </Link>
      </Themed.p>
      <Flex sx={{ flexDirection: 'column', marginY: 3 }}>
        <NetworkLink nodeId={tag} />
      </Flex>
      <RecommendationsList recommendations={recommendations} />
    </>
  );
};

export default TagsIndex;
