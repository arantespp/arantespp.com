import { compareTwoStrings, findBestMatch } from 'string-similarity';
import { getPosts } from './files';
import removeMarkdown from 'remove-markdown';

const MAX_POSTS = 5;

export const searchPosts = async ({ query }: { query: string }) => {
  const posts = await getPosts();

  const postsWithRatings = posts.map((post) => {
    const tagsWithoutHyphens = post.tags.map((tag) => tag.replace(/-/g, ' '));

    const plainContent = removeMarkdown(post.content);

    const weightedRatings = [
      [compareTwoStrings(query, post.title), 3],
      [compareTwoStrings(query, post.excerpt), 2],
      [findBestMatch(query, tagsWithoutHyphens).bestMatch.rating, 2],
      [compareTwoStrings(query, plainContent), 1],
    ];

    const weightedRatingMean =
      weightedRatings.reduce(
        (acc, [rating, weight]) => acc + rating * weight,
        0,
      ) / weightedRatings.reduce((acc, [, weight]) => acc + weight, 0);

    return { post, rating: weightedRatingMean };
  });

  const sortedPosts = postsWithRatings
    .sort((a, b) => b.rating - a.rating)
    .splice(0, MAX_POSTS);

  return sortedPosts.map(({ post }) => post);
};
