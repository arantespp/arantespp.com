import { pascalCase } from 'change-case';
import { InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import * as React from 'react';
import { findBestMatch } from 'string-similarity';
import {
  Box,
  Checkbox,
  Input,
  Label,
  Link,
  Radio,
  Themed,
  Text,
  Flex,
} from 'theme-ui';
import { useDebounce } from 'use-debounce';

import RecommendationsList from '../components/RecommendationsList';

import { allPosts as filesAllPosts, Post } from '../lib/files';
import { Group, GROUPS } from '../lib/groups';

export const getStaticProps = async () => ({
  props: { allPosts: filesAllPosts },
});

const POST_MIN_RATING = 0.5;

const MAX_POSTS_BEST_MATCHES = 5;

const sorts = ['Rating', 'Date', 'Title'] as const;

type Sorts = typeof sorts[number];

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
      <Flex sx={{ justifyContent: 'flex-start' }}>{children}</Flex>
    </Box>
  );
};

const All = ({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebounce(search, 200);
  const [sorting, setSorting] = React.useState<Sorts>('Rating');
  const [showGroups, setShowGroups] = React.useState([...GROUPS]);

  const [filteredPosts, setFilteredPosts] = React.useState(allPosts);

  React.useEffect(() => {
    const postsByGroups = allPosts.filter((post) =>
      showGroups.includes(post.group),
    );

    const postsBySearch = (() => {
      if (!debouncedSearch || postsByGroups.length === 0) {
        return postsByGroups;
      }

      const postPropertiesToBeCompared: Array<keyof Post> = [
        'title',
        'content',
        'tags',
      ];

      /**
       * Create an array of strings with posts title and excerpts to be
       * compared by string similarity method.
       */
      const arrayCompare = postsByGroups.flatMap((post) =>
        postPropertiesToBeCompared
          .map((property) => {
            if (Array.isArray(post[property])) {
              return (post[property] as Array<string>).join(' ');
            }

            return post[property];
          })
          .map((property) => String(property)),
      );

      const { bestMatch, bestMatchIndex, ratings } = findBestMatch(
        debouncedSearch.toLowerCase(),
        arrayCompare.map((str) => str.toLowerCase()),
      );

      /**
       * Take the max rating between title and excerpt.
       */
      const mergeRatings = ratings
        .reduce<number[]>((acc, cur, index) => {
          const pos = Math.floor(index / postPropertiesToBeCompared.length);

          if (acc[pos]) {
            acc[pos] = Math.max(acc[pos], cur.rating);
          } else {
            acc[pos] = cur.rating;
          }

          return acc;
        }, [])
        .map((rating, index) => ({ rating, post: postsByGroups[index] }));

      const bestMatches = mergeRatings
        .sort((a, b) => b.rating - a.rating)
        /**
         * Take only the best five matches.
         */
        .filter((_, index) => index < MAX_POSTS_BEST_MATCHES)
        /**
         * Take only posts whose rating is greater than POST_MIN_RATING.
         */
        .filter(({ rating }) => rating > POST_MIN_RATING);

      if (bestMatch.rating === 0) {
        return [];
      }

      if (bestMatches.length === 0) {
        return [
          postsByGroups[
            Math.floor(bestMatchIndex / postPropertiesToBeCompared.length)
          ],
        ];
      }

      return bestMatches.map(({ post }) => post);
    })();

    setFilteredPosts(postsBySearch);
  }, [showGroups, debouncedSearch, allPosts]);

  return (
    <>
      <Themed.h1>All Posts</Themed.h1>
      <Box sx={{ marginY: 4 }}>
        <NextLink href="/network" passHref>
          <Link>
            Check The Network the see all posts, tags, and their connections.
          </Link>
        </NextLink>
      </Box>

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
        <FilterBlock title="Search:">
          <Input
            placeholder="What do you want to read?"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBlock>

        <FilterBlock title="Show Groups:" hidden>
          {GROUPS.map((group) => (
            <Label key={group}>
              <Checkbox
                name="group"
                value={group}
                checked={showGroups.includes(group)}
                onChange={(e) =>
                  setShowGroups((currentGroups) => {
                    const value = e.target.value as Group;

                    if (currentGroups.includes(value)) {
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

        <FilterBlock title="Sort Posts By:">
          {sorts.map((sort) => (
            <Label key={sort} sx={{ marginRight: 3, width: 'auto' }}>
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
      </Box>

      <RecommendationsList
        recommendations={filteredPosts.sort((postA, postB) => {
          if (sorting === 'Rating') {
            return postB.rating - postA.rating;
          }

          if (sorting === 'Date') {
            return postB.date.localeCompare(postA.date);
          }

          if (sorting === 'Title') {
            return postA.title.localeCompare(postB.title);
          }

          return 0;
        })}
      />
    </>
  );
};

export default All;
