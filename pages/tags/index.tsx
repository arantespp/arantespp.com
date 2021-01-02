import { InferGetStaticPropsType } from 'next';

import TagsPage from '../../components/TagsPage';

import { getAllTags } from '../../lib/files';

export const getStaticProps = async () => {
  const tags = getAllTags();
  return {
    props: { tags },
  };
};

const TagsIndex = ({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <TagsPage tags={tags} />;
};

export default TagsIndex;
