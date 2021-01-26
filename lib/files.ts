/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import { paramCase } from 'change-case';
import * as dateFns from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { Group, GROUPS } from './groups';

const postsDirectory = path.join(process.cwd(), 'posts');

export type { Group };

type PostMeta = {
  title: string;
  excerpt: string;
  draft?: boolean;
  date: string;
  formattedDate: string;
  tags: string[];
  rating: number;
  backlinks: Array<{ title: string; href: string }>;
  image:
    | {
        url: string;
        alt: string;
        caption: string;
      }
    | null
    | undefined;
};

export type Post = PostMeta & {
  href: string;
  group: Group;
  slug: string;
  content: string;
};

const LIMIT = 7;

/**
 * Only groups that are written in md files.
 */
export const getGroups = () => GROUPS;

let drafts: Array<
  Partial<PostMeta> & {
    href: string;
    group: Group;
    slug: string;
    content: string;
  }
> = [];

export const getDrafts = () =>
  drafts.map((draft) => ({
    title: 'DRAFT TITLE',
    excerpt: 'DRAFT EXCERPT',
    date: 'DRAFT DATE',
    formattedDate: 'DRAFT FORMATTED DATE',
    tags: [],
    rating: 0,
    image: null,
    backlinks: [],
    ...draft,
    href: `/_drafts${draft.href}`,
    draft: true,
  }));

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

    const {
      title,
      excerpt,
      date,
      rating,
      tags,
      image,
      draft,
    } = data as PostMeta;

    const getDate = () => {
      /**
       * https://stackoverflow.com/a/52352512/8786986
       */
      const dt = new Date(date);
      const dtDateOnly = new Date(
        dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
      );
      return {
        date: dateFns.format(dtDateOnly, 'yyyy-MM-dd'),
        /**
         * Added formattedDate to don't need to use date-fns in the App.
         */
        formattedDate: dateFns.format(dtDateOnly, 'MMMM dd, yyyy'),
      };
    };

    const getTags = () =>
      tags
        .map((tag) => paramCase(tag))
        .sort((tagA, tagB) => tagA.localeCompare(tagB));

    const post = {
      title,
      excerpt,
      ...getDate(),
      href,
      group,
      slug,
      content,
      rating,
      tags: getTags(),
      image,
      draft,
    };

    if (!href || !group || !slug) {
      return undefined;
    }

    /**
     * All properties most not have undefined to void this error:
     * Reason: `undefined` cannot be serialized as JSON. Please use `null`
     * or omit this value.
     */
    Object.entries(post).forEach(([key, value]) => {
      if (!value) {
        delete post[key];
      }
    });

    const requiredPostProperties: Array<keyof Post> = [
      'title',
      'excerpt',
      'date',
      'formattedDate',
      'content',
      'rating',
      'tags',
    ];

    const doesPostHaveAllRequiredProperties = requiredPostProperties.reduce(
      (acc, property) => acc && post[property],
      true
    );

    if (!doesPostHaveAllRequiredProperties || post.draft) {
      drafts.push(post);
      return undefined;
    } else {
      return post;
    }
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

export const allPosts = getGroups()
  .reduce((acc, group) => [...acc, getPostsByGroup(group)], [])
  .flat();

const getPost = (props: GetPartialPostProps): Post | undefined => {
  const partialPost = getPartialPost(props);

  if (!partialPost) {
    return undefined;
  }

  const backlinks = allPosts
    .filter(({ content }) => content.includes(`(${partialPost.href})`))
    .map(({ title, href }) => ({ title, href }));

  const newContent = (() => {
    const { content } = partialPost;

    if (backlinks.length === 0) {
      return content;
    }

    /**
     * If backlinks exist, add them to content.
     */
    return [
      partialPost.content,
      '## Backlinks',
      ...backlinks.map(({ href, title }) => `- [${title}](${href})`),
    ].join('\n');
  })()
    /**
     * Highlight excerpt.
     */
    .replace(partialPost.excerpt, `\`${partialPost.excerpt}\``);

  return { ...partialPost, content: newContent, backlinks };
};

export const getFile = (filePath: string) => {
  try {
    const fullPath = path.join(postsDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    return content;
  } catch (err) {
    return undefined;
  }
};

type GetPostsProps = {
  all?: boolean;
  group?: Group;
  tags?: string[];
};

/**
 * Get posts. Con be filtered by "group" and "tags".
 *
 * @param param.all return all posts. It ignores "group" and "tags" params.
 * @param param.group return posts that belong to a group.
 * @param param.tags return posts that have tags.
 */
export const getPosts = ({ all, group, tags }: GetPostsProps = {}) => {
  const getGroupAndTagsPosts = () => {
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

    return (
      [...tagsPosts, ...groupPosts]
        /**
         * Remove duplicated posts that may come from group and tags posts.
         * https://stackoverflow.com/a/56757215/8786986
         */
        .filter(
          (post, index, arr) =>
            arr.findIndex(({ href }) => href === post.href) === index
        )
    );
  };

  return (
    (all ? allPosts : getGroupAndTagsPosts())
      .sort((postA, postB) => postB.date.localeCompare(postA.date))
      .sort((postA, postB) => postB.rating - postA.rating)
      /**
       * Limit the number of posts returned.
       */
      .slice(0, LIMIT)
  );
};

export const getAllTags = () => {
  return getPosts({ all: true })
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

/**
 * Used by recommendations.
 */
export type PostWithoutContent = Omit<Post, 'content'>;

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
