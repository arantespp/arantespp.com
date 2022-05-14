import { compareTwoStrings, findBestMatch } from 'string-similarity';
import { getPosts } from './files';

const MAX_POSTS = 5;

const POST_MIN_RATING = 0.1;

export const searchPosts = async ({ query }: { query: string }) => {
  const posts = await getPosts();

  const postsWithRatings = posts.map((post) => {
    const weightedRatings = [
      [compareTwoStrings(query, post.title), 10],
      [compareTwoStrings(query, post.excerpt), 10],
      [findBestMatch(query, post.tags).bestMatch.rating, 8],
      [compareTwoStrings(query, post.content), 5],
    ];

    const weightedRatingMean =
      weightedRatings.reduce(
        (acc, [rating, weight]) => acc + rating * weight,
        0,
      ) / weightedRatings.reduce((acc, [, weight]) => acc + weight, 0);

    return { post, rating: weightedRatingMean };
  });

  const sortedPosts = postsWithRatings
    .filter(({ rating }) => rating > POST_MIN_RATING)
    .sort((a, b) => b.rating - a.rating)
    .splice(0, MAX_POSTS);

  return sortedPosts.map(({ post }) => post);
};
