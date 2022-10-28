import { CarouselJsonLd } from 'next-seo';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NetworkLink } from '../../components/NetworkLink';
import { NextSeo } from 'next-seo';
import { Text, Themed } from 'theme-ui';
import { getAllTags, getRecommendations } from '../../../lib/files';
import Link from '../../components/Link';
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
  const recommendations = await getRecommendations({ tag, limit: Infinity });
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
      <Text as="p" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
        There are {recommendations.length} posts related to <Tag tag={tag} />{' '}
        tag.
      </Text>
      <Text as="p" sx={{ marginBottom: 5, display: 'flex', gap: 3 }}>
        <Link href="/tags">All Tags</Link>
        <NetworkLink nodeId={tag} />
      </Text>
      <RecommendationsList recommendations={recommendations} />
    </>
  );
};

export default TagsIndex;
