import { CarouselJsonLd } from 'next-seo';
import { Flex, Text, Themed } from 'theme-ui';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { getAllTags, getRecommendations } from '../../../lib/files';
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

  const description = `A list of all the ${tag} posts and notes.`;

  return (
    <>
      <NextSeo title={title} description={description} />
      <CarouselJsonLd
        ofType="default"
        data={recommendations.map(({ url }) => ({
          url,
        }))}
      />
      <Themed.h1>{title}</Themed.h1>
      <Text as="p" sx={{ marginY: 4 }}>
        There are {recommendations.length} posts related to the tag{' '}
        <Tag tag={tag} />. <Link href="/tags">Click here</Link> if you want to
        see all tags instead.
      </Text>
      <RecommendationsList recommendations={recommendations} />
      <Flex sx={{ flexDirection: 'column', marginTop: 4 }}>
        <NetworkLink nodeId={tag} />
      </Flex>
    </>
  );
};

export default TagsIndex;
