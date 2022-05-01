import * as React from 'react';
import { Post } from '../../lib/files';
import { findBestMatch } from 'string-similarity';
import { useDebounce } from 'use-debounce';

const postPropertiesToBeCompared: Array<keyof Post> = [
  'title',
  'tags',
  'excerpt',
];

const MAX_POSTS_BEST_MATCHES = 5;

const POST_MIN_RATING = 0.2;

const sortByDate = (postA: Post, postB: Post) => {
  return postB.date.localeCompare(postA.date);
};

export const useSearchPosts = ({
  allPosts,
}: {
  allPosts: Omit<Post, 'content'>[];
}) => {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [filteredPosts, setFilteredPosts] = React.useState(allPosts);

  const arrayToCompare = React.useMemo(() => {
    const postsSortedByDate = allPosts.sort(sortByDate);

    /**
     * Create an array of strings with posts title and excerpts to be
     * compared by string similarity method.
     */
    return postsSortedByDate.flatMap((post) => {
      return postPropertiesToBeCompared.map((key) =>
        String(post[key]).toLocaleLowerCase(),
      );
    });
  }, [allPosts]);

  React.useEffect(() => {
    if (!debouncedSearch) {
      setFilteredPosts(allPosts);
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

    const numberOfComparedProperties = postPropertiesToBeCompared.length;

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
  }, [debouncedSearch, allPosts, arrayToCompare]);

  return { results: filteredPosts, firstResult: filteredPosts[0], setSearch };
};
