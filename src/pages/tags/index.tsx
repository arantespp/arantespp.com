import { Box, Flex, Text, Themed } from 'theme-ui';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { getAllTags } from '../../../lib/files';
import Tag from '../../components/Tag';

export const getStaticProps = async () => {
  const tags = await getAllTags();
  return { props: { tags } };
};

const TagsIndex = ({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <NextSeo title="Tags" />
    <Themed.h1>Tags</Themed.h1>
    <Text as="p" sx={{ fontStyle: 'italic', marginBottom: 4 }}>
      Total of {tags.length} tags.
    </Text>
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {tags.map((tag) => (
        <Box sx={{ marginRight: 4, marginBottom: 3 }} key={tag}>
          <Tag tag={tag} />
        </Box>
      ))}
    </Flex>
  </>
);

export default TagsIndex;
