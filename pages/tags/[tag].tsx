import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Link, Styled } from 'theme-ui';

import Recommendations from '../../components/Recommendations';
import Tag from '../../components/Tag';

import { getAllTags, getRecommendations } from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllTags().map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { tag },
}: {
  params: { tag: string };
}) => {
  const recommendations = getRecommendations({ tags: [tag] });
  return {
    props: { tag, recommendations },
  };
};

const TagsIndex = ({
  recommendations,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>#{tag}</title>
      </Head>
      <Styled.h1>#{tag}</Styled.h1>
      <Styled.p>
        Recommended posts related to the tag <Tag tag={tag} /> are shown below.
      </Styled.p>
      <NextLink href="/tags" passHref>
        <Link>See all tags</Link>
      </NextLink>
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default TagsIndex;
