import { pascalCase } from 'change-case';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { Box, Checkbox, Label, Radio, Styled, Text } from 'theme-ui';

import RecommendationCard from '../components/RecommendationCard';

import { allPosts } from '../lib/files';
import { Group, GROUPS } from '../lib/groups';

export const getStaticProps = async () => {
  return { props: { allPosts } };
};

const sorts = ["Author's relevance", 'Date', 'Title'] as const;

type Sorts = typeof sorts[number];

const FilterBlock = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
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
      {children}
    </Box>
  );
};

const AllPosts = ({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sorting, setSorting] = React.useState<Sorts>("Author's relevance");
  const [showGroups, setShowGroups] = React.useState([...GROUPS]);

  return (
    <>
      <Styled.h1>All Posts</Styled.h1>

      <Box
        sx={{
          '& > div:last-child': {
            borderBottomStyle: 'solid',
            borderWidth: 1,
            borderColor: 'muted',
            paddingBottom: 4,
          },
        }}
      >
        <FilterBlock title="Sort Posts By:">
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
        </FilterBlock>

        <FilterBlock title="Show Groups:">
          {GROUPS.map((group) => (
            <Label key={group}>
              <Checkbox
                name="group"
                value={group}
                checked={showGroups.includes(group)}
                onChange={(e) =>
                  setShowGroups((currentGroups) => {
                    const value = e.target.value as Group;

                    if (currentGroups.includes(value as any)) {
                      return currentGroups.filter((g) => g !== group);
                    }

                    return [...currentGroups, value];
                  })
                }
              />
              {pascalCase(group)}
            </Label>
          ))}
        </FilterBlock>
      </Box>

      {allPosts
        .filter((post) => showGroups.includes(post.group))
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
