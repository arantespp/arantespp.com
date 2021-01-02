import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import TagsPage from '../../components/TagsPage';

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
  const tags = getAllTags();
  const recommendations = getRecommendations({ tags: [tag] });
  return {
    props: { tags, recommendations },
  };
};

const TagsIndex = ({
  recommendations,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <TagsPage tags={tags} recommendations={recommendations} />;
};

export default TagsIndex;
