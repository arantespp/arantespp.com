import { InferGetStaticPropsType } from 'next';
import { Box, Flex, Styled } from 'theme-ui';

import Tag from '../../components/Tag';

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
  return (
    <>
      <Styled.h1>Tags</Styled.h1>
      <Flex sx={{ flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Box sx={{ marginRight: 4, marginBottom: 3 }} key={tag}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default TagsIndex;
