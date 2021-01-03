import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { Box, Divider, Label, Radio, Styled, Text } from 'theme-ui';

import RecommendationCard from '../components/RecommendationCard';

import { allPosts } from '../lib/files';

export const getStaticProps = async () => {
  return { props: { allPosts } };
};

const sorts = ["Author's relevance", 'Date', 'Title'] as const;

type Sorts = typeof sorts[number];

const AllPosts = ({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sorting, setSorting] = React.useState<Sorts>("Author's relevance");

  return (
    <>
      <Styled.h1>All Posts</Styled.h1>

      <Box
        sx={{
          fontSize: 1,
          borderBottomStyle: 'solid',
          borderWidth: 1,
          borderColor: 'muted',
          paddingBottom: 4,
        }}
      >
        <Text as="p" sx={{ fontWeight: 'bold', paddingBottom: 1 }}>
          Sort posts by:
        </Text>
        {sorts.map((sort) => (
          <Label key={sort}>
            <Radio
              name="sorting"
              value={sort}
              checked={sorting === sort}
              onChange={(e) => setSorting(e.target.value as Sorts)}
            />
            {sort}
          </Label>
        ))}
      </Box>

      {allPosts
        .sort((postA, postB) => {
          if (sorting === "Author's relevance") {
            return postB.rating - postA.rating;
          }

          if (sorting === 'Date') {
            return postB.date.localeCompare(postA.date);
          }

          if (sorting === 'Title') {
            return postA.title.localeCompare(postB.title);
          }

          return 0;
        })
        .map((post) => (
          <RecommendationCard key={post.href} recommendation={post} />
        ))}
    </>
  );
};

export default AllPosts;
