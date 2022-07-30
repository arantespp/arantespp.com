import { Box, Flex, Themed } from 'theme-ui';
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
    <Themed.p>Total of {tags.length} tags.</Themed.p>
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      {tags.map((tag) => (
        <Box sx={{ marginRight: 4, marginBottom: 3 }} key={tag}>
          <Tag tag={tag} />
        </Box>
      ))}
    </Flex>
  </>
);

export default TagsIndex;
