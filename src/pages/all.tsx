import * as React from 'react';
import { Box, Flex, Input, Text, Themed } from 'theme-ui';
import { InferGetStaticPropsType } from 'next';
import { getPosts } from '../../lib/files';
import { useSearchPosts } from '../hooks/useSearchPosts';
import RecommendationsList from '../components/RecommendationsList';

export const getStaticProps = async () => {
  const allPosts = (await getPosts()).map(({ content, ...rest }) => rest);

  return {
    props: {
      allPosts,
    },
  };
};

const FilterBlock = ({
  children,
  hidden,
  title,
}: {
  children: React.ReactNode;
  title: string;
  hidden?: boolean;
}) => {
  if (hidden) {
    return null;
  }

  return (
    <Box
      sx={{
        fontSize: 1,
        paddingBottom: 3,
      }}
    >
      <Text as="p" sx={{ fontWeight: 'bold', paddingBottom: 1 }}>
        {title}
      </Text>
      <Flex sx={{ justifyContent: 'flex-start', flexDirection: 'column' }}>
        {children}
      </Flex>
    </Box>
  );
};

const All = ({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setSearch, results } = useSearchPosts({ allPosts });

  return (
    <>
      <Themed.h1>All Posts</Themed.h1>

      <Box sx={{ marginBottom: 5, marginTop: 5 }}>
        <FilterBlock title={`Search among ${allPosts.length} posts:`}>
          <Input
            autoFocus
            placeholder="What do you want to read?"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBlock>
      </Box>

      <RecommendationsList recommendations={results} />
    </>
  );
};

export default All;
