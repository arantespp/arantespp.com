import { InferGetStaticPropsType } from 'next';
import { Box, Flex, Themed } from 'theme-ui';

import HTMLHeaders from '../../src/components/HTMLHeaders';
import Tag from '../../src/components/Tag';

import { getAllTags } from '../../src/lib/files';

export const getStaticProps = async () => {
  const tags = getAllTags();
  return {
    props: { tags },
  };
};

const TagsIndex = ({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <HTMLHeaders keywords={tags} title="Tags" />
    <Themed.h1>Tags</Themed.h1>
    <Themed.p>Total of {tags.length} tags.</Themed.p>
    <Flex sx={{ flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Box sx={{ marginRight: 4, marginBottom: 3 }} key={tag}>
          <Tag tag={tag} />
        </Box>
      ))}
    </Flex>
  </>
);

export default TagsIndex;
