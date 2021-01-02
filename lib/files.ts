/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import { paramCase } from 'change-case';
import * as dateFns from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { connect } from 'http2';
import path from 'path';

import { Group } from './groups';

const postsDirectory = path.join(process.cwd(), 'posts');

export type { Group };

type PostMeta = {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  rating: number;
  backlinks: Array<{ title: string; href: string }>;
};

export type Post = PostMeta & {
  href: string;
  group: string;
  slug: string;
  content: string;
};

export type PostWithoutContent = Omit<Post, 'content'>;

const LIMIT = 15;

/**
 * Only groups that have posts.
 */
export const getGroups = (): Group[] => ['blog', 'zettelkasten'];

type GetPartialPostProps = {
  group: Group;
  slug: string;
};

/**
 * It does not return backlinks.
 */
const getPartialPost = ({ group, slug }: GetPartialPostProps) => {
  try {
    const fullPath = path.join(postsDirectory, group || '', `${slug}.md`);

    const href = path.join('/', group || '', slug);

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const { title, excerpt, date, rating, tags } = data as PostMeta;

    const getDate = () => {
      /**
       * https://stackoverflow.com/a/52352512/8786986
       */
      const dt = new Date(date);
      const dtDateOnly = new Date(
        dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
      );
      return dateFns.format(dtDateOnly, 'yyyy-MM-dd');
    };

    const getTags = () =>
      tags
        .map((tag) => paramCase(tag))
        .sort((tagA, tagB) => tagA.localeCompare(tagB));

    const post = {
      title,
      excerpt,
      date: getDate(),
      href,
      group,
      slug,
      content,
      rating,
      tags: getTags(),
    };

    /**
     * Return null if some value of the post is null or undefined.
     */
    if (
      Object.values(post).some((value) => value == null || value == undefined)
    ) {
      return undefined;
    }

    return post;
  } catch {
    return undefined;
  }
};

const getPostsByGroup = (group: Group) => {
  try {
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
        .map((slug) => getPartialPost({ group, slug }))
        /**
         * Return only posts that are not null.
         */
        .filter((post) => !!post) as Post[]
    );
    /**
     * Catch some group that not have .md files, as "me".
     */
  } catch {
    return [];
  }
};

const allPosts = getGroups()
  .reduce((acc, group) => [...acc, getPostsByGroup(group)], [])
  .flat();

const getPost = (props: GetPartialPostProps): Post | undefined => {
  const partialPost = getPartialPost(props);

  if (!partialPost) {
    return undefined;
  }

  const backlinks = allPosts
    .filter(({ content }) => content.includes(partialPost.href))
    .map(({ title, href }) => ({ title, href }));

  /**
   * If backlinks exist, add them to content.
   */
  const newContent = (() => {
    const { content } = partialPost;

    if (backlinks.length === 0) {
      return content;
    }

    return [
      partialPost.content,
      '### Backlinks',
      ...backlinks.map(({ href, title }) => `- [${title}](${href})`),
    ].join('\n');
  })();

  return { ...partialPost, content: newContent, backlinks };
};

export const getIndex = (group: Group | '.') => {
  try {
    const fullPath = path.join(postsDirectory, group, `index.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    return content;
  } catch (err) {
    return undefined;
  }
};

type GetPostsProps = {
  group?: Group;
  tags?: string[];
};

/**
 * Get posts. Filter by "group" and "tags".
 *
 * @param param.group return posts that belong to a group.
 * @param param.tags return posts that have tags.
 */
export const getPosts = ({ group, tags }: GetPostsProps = {}) => {
  const groupPosts = group ? getPostsByGroup(group) : [];

  const tagsPosts = tags
    ? allPosts
        /**
         * Return only posts that contain the tags.
         */
        .filter((post) =>
          tags.reduce((acc, tag) => acc || post.tags.includes(tag), false)
        )
    : [];

  const groupAndTagsPosts = [...tagsPosts, ...groupPosts]
    /**
     * Remove duplicated posts that may come from group and tags posts.
     * https://stackoverflow.com/a/56757215/8786986
     */
    .filter(
      (post, index, arr) =>
        arr.findIndex(({ href }) => href === post.href) === index
    );

  /**
   * If group and tags posts have no posts, all posts are returned instead.
   */
  return (
    (groupAndTagsPosts.length === 0 ? allPosts : groupAndTagsPosts)
      .sort((postA, postB) => postB.date.localeCompare(postA.date))
      .sort((postA, postB) => postB.rating - postA.rating)
      /**
       * Limit the number of posts returned.
       */
      .slice(0, LIMIT)
  );
};

export const getAllTags = () => {
  return getPosts()
    .flatMap(({ tags }) => tags)
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
};

export const getRecommendations = (props: GetPostsProps = {}) => {
  return (
    getPosts(props)
      /**
       * Do not return the content.
       */
      .map(({ content, ...rest }) => rest)
  );
};

export type Recommendation = PostWithoutContent;

/**
 * Return specific post and post recommendations.
 */
export const getPostAndPostsRecommendations = ({
  slug,
  group,
}: {
  group: Group;
  slug: string;
}) => {
  const post = getPost({ group, slug });

  const { tags } = post || {};

  const recommendations = post
    ? getRecommendations({ tags, group })
        /**
         * Don't return the post as recommendation.
         */
        .filter(({ href }) => href !== post?.href)
    : [];

  return { post, recommendations };
};
