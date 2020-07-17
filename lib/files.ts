/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { GROUPS, Group } from './groups';

const postsDirectory = path.join(process.cwd(), 'posts');

export type { Group };

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  group: string;
  slug: string;
  content: string;
};

export const getGroups = () => [...GROUPS];

export const getPost = ({
  group = '.',
  slug,
}: {
  group?: Group | '.';
  slug: string;
}) => {
  const fullPath = path.join(postsDirectory, group, `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const defaultProperties = { excerpt: '' };

  const {
    data: { title, excerpt = defaultProperties.excerpt, date },
    content,
  } = matter(fileContents);

  const href = path.join('/', group, slug);

  const post: Post = {
    title,
    excerpt,
    date,
    href,
    group,
    slug,
    content,
  };

  /**
   * Return null if some value of the post is null or undefined.
   */
  if (
    Object.values(post).some((value) => value == null || value == undefined)
  ) {
    return null;
  }

  return post;
};

const getPostsByGroup = (group: Group) => {
  return (
    fs
      /**
       * Read all files inside group folder.
       */
      .readdirSync(path.join(postsDirectory, group))
      /**
       * Get the slug from filename.
       */
      .map((dir) => dir.replace(/\.md$/, ''))
      /**
       * Remove index.md file
       */
      .filter((slug) => slug !== 'index')
      /**
       * Return the post
       */
      .map((slug) => getPost({ group, slug }))
      /**
       * Return only posts that are not null.
       */
      .filter((post) => !!post) as Post[]
  );
};

export const getPosts = <T extends keyof Post>({
  groups = [...getGroups()],
}: {
  groups?: Group[];
  fields?: T[];
} = {}): Array<{ [key in T]: Post[key] }> =>
  groups
    .reduce<Post[]>(
      (acc, groupName) => [...acc, ...getPostsByGroup(groupName)],
      []
    )
    .sort((post1, post2) => post2.date.localeCompare(post1.date));

/**
 * Return specific post and post recommendations.
 */
export const getPostAndPostsRecommendations = ({
  group,
  slug,
}: {
  group?: Group;
  slug: string;
}) => {
  const post = getPost({ group, slug });
  const recommendations = getPosts({
    groups: group ? [group] : undefined,
    fields: ['date', 'excerpt', 'href', 'title'],
  });
  return { post, recommendations };
};

export type PostAndPostsRecommendations = ReturnType<
  typeof getPostAndPostsRecommendations
>;
