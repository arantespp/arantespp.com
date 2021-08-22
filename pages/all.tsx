import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { findBestMatch } from 'string-similarity';
import { Box, Input, Themed, Text, Flex } from 'theme-ui';
import { useDebounce } from 'use-debounce';

import RecommendationsList from '../src/components/RecommendationsList';

import { allPosts as filesAllPosts, Post } from '../src/lib/files';

const sortByDate = (postA: Post, postB: Post) => {
  return postB.date.localeCompare(postA.date);
};

export const getStaticProps = async () => {
  const postsSortedByDate = filesAllPosts.sort(sortByDate);

  const postPropertiesToBeCompared: Array<keyof Post> = [
    'title',
    'tags',
    'excerpt',
    // 'content',
  ];

  /**
   * Create an array of strings with posts title and excerpts to be
   * compared by string similarity method.
   */
  const arrayToCompare = postsSortedByDate.flatMap((post) => {
    return postPropertiesToBeCompared.map((key) =>
      String(post[key]).toLocaleLowerCase(),
    );
  });

  return {
    props: {
      allPosts: postsSortedByDate,
      arrayToCompare,
      numberOfComparedProperties: postPropertiesToBeCompared.length,
    },
  };
};

const MAX_POSTS_BEST_MATCHES = 5;

const POST_MIN_RATING = 0.2;

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

const All = ({
  allPosts,
  arrayToCompare,
  numberOfComparedProperties,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [filteredPosts, setFilteredPosts] = React.useState(allPosts);

  React.useEffect(() => {
    if (!debouncedSearch) {
      setFilteredPosts([]);
      return;
    }

    const { bestMatchIndex, ratings } = findBestMatch(
      debouncedSearch.toLowerCase(),
      arrayToCompare,
    );

    /**
     * `arrayToCompare` has the size of `allPosts` multiplied by
     * `numberOfComparedProperties`. Suppose that the number of compared
     * properties is four, then the ratings 0, 1, 2, and 3 refers to first post.
     */
    const getPostFromRatingIndex = (index: number) =>
      Math.floor(index / numberOfComparedProperties);

    const postsPositions = ratings
      .map(({ rating }, index) => ({
        rating,
        postPosition: getPostFromRatingIndex(index),
      }))
      .sort((a, b) => b.rating - a.rating)
      /**
       * Take only the best five matches.
       */
      .filter((_, index) => index < MAX_POSTS_BEST_MATCHES)
      /**
       * Take only posts whose rating is greater than POST_MIN_RATING.
       */
      .filter(({ rating }) => rating > POST_MIN_RATING)
      .map(({ postPosition }) => postPosition);

    const postsPositionsWithoutDuplication = Array.from(
      new Set(postsPositions),
    );

    if (postsPositionsWithoutDuplication.length === 0) {
      setFilteredPosts([allPosts[getPostFromRatingIndex(bestMatchIndex)]]);
      return;
    }

    const bestMatches = postsPositionsWithoutDuplication.map(
      (postPosition) => allPosts[postPosition],
    );

    setFilteredPosts(bestMatches);
  }, [debouncedSearch, allPosts, arrayToCompare, numberOfComparedProperties]);

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

      <RecommendationsList recommendations={filteredPosts} />
    </>
  );
};

export default All;
