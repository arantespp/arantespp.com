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

const DOMAIN = 'https://arantespp.com';

const GITHUB_PROJECT = 'https://github.com/arantespp/arantespp.com';

export type { Group };

export type Book = {
  authors: string[];
  link: string;
  image?: string;
  ASIN?: string;
  ISBN?: string;
};

type PostMeta = {
  title: string;
  excerpt: string;
  draft?: boolean;
  date: string;
  formattedDate: string;
  updatedAt?: string;
  updateHistory?: string;
  tags: string[];
  rating: number;
  backlinks?: PostWithoutContent[];
  image?: {
    url: string;
    alt: string;
  } | null;
  book?: Book | null;
  editLink?: string;
};

export type Post = PostMeta & {
  href: string;
  group: Group;
  slug: string;
  content: string;
};

/**
 * Used by recommendations.
 */
export type PostWithoutContent = Omit<Post, 'content'>;

export type Recommendation = PostWithoutContent;

const LIMIT = 7;

/**
 * Only groups that are written in md files.
 */
export const getGroups = () => GROUPS;

/**
 * This array is created by side effect inside getPartialPost.
 */
const drafts: Array<
  Partial<PostMeta> & {
    href: string;
    group: Group;
    slug: string;
    content: string;
  }
> = [];

export const getDrafts = () =>
  drafts
    .filter(
      ({ group, slug }, index) =>
        index ===
        drafts.findIndex(
          (draft) => draft.group === group && draft.slug === slug,
        ),
    )
    .map((draft) => ({
      ...draft,
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

const getDate = (date: string | Date) => {
  /**
   * https://stackoverflow.com/a/52352512/8786986
   */
  const dt = new Date(date);
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000,
  );
  return {
    date: dateFns.format(dtDateOnly, 'yyyy-MM-dd'),
    /**
     * Added formattedDate to don't need to use date-fns in the App.
     */
    formattedDate: dateFns.format(dtDateOnly, 'MMMM dd, yyyy'),
  };
};

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
      tags = [],
      image,
      draft,
      book,
    } = data as PostMeta;

    const getTags = (customTags: string[] = []) =>
      [...tags, ...customTags]
        /**
         * Remove invalid tags.
         */
        .filter((tag) => !!tag)
        /**
         * https://stackoverflow.com/a/37511463/8786986
         */
        .map((tag) => tag.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        .map((tag) => paramCase(tag))
        /**
         * Remove duplicated tags.
         * https://stackoverflow.com/a/56757215/8786986
         */
        .filter((tag, index, array) => array.indexOf(tag) === index)
        .sort((tagA, tagB) => tagA.localeCompare(tagB));

    const { mtime } = fs.statSync(fullPath);
    const { formattedDate: updatedAt } = getDate(mtime);

    /**
     * Add book image.
     */
    (() => {
      if (!book || book?.image) {
        return;
      }

      /**
       * Check if image with same post name exists.
       */
      ['jpg', 'png'].forEach((ext) => {
        const imageUrl = path.join('/', 'images', group, `${slug}.${ext}`);
        const imageDir = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(imageDir)) {
          book.image = imageUrl;
        }
      });
    })();

    const post = {
      title,
      excerpt,
      ...(date ? getDate(date) : {}),
      updatedAt,
      updateHistory: `${GITHUB_PROJECT}/commits/main/posts${href}.md`,
      href,
      group,
      slug,
      content,
      rating,
      /**
       * Book authors become tags.
       */
      tags: getTags(book?.authors || []),
      image,
      draft,
      book,
      editLink: `${GITHUB_PROJECT}/edit/main/posts${href}.md`,
      url: `${DOMAIN}${href}`,
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
      (acc, property) => acc && !!post[property],
      true,
    );

    /**
     * Highlight excerpt, even if it is a draft.
     */
    post.content = (post.content || '').replace(
      post.excerpt,
      `\`${post.excerpt}\``,
    );

    if (!doesPostHaveAllRequiredProperties) {
      post.draft = true;
    }

    if (post.draft) {
      drafts.push(post);
    }

    return post as Post;
  } catch (error) {
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
         * Return only markdown files.
         */
        .filter((dir) => dir.endsWith('.md'))
        /**
         * Get the slug from filename.
         */
        .map((dir) => dir.replace(/\.md$/, ''))
        /**
         * Remove index.md file.
         */
        .filter((slug) => slug !== 'index')
        /**
         * Return the post.
         */
        .map((slug) => getPartialPost({ group, slug }))
        /**
         * Return only posts that are not null.
         */
        .filter((post) => !!post)
        /**
         * Do not return drafts.
         */
        .filter((post) => !post?.draft) as Post[]
    );
    /**
     * Catch some group that not have .md files.
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
    .map(({ content, ...post }) => post);

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
  })();

  return { ...partialPost, content: newContent, backlinks };
};

/**
 * Generally used to read index.md pages.
 */
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
 * Remove duplicated posts that may come from group and tags posts.
 * https://stackoverflow.com/a/56757215/8786986
 */
const removeDuplicatedPosts = (post: Post, index: number, arr: Post[]) =>
  arr.findIndex(({ href }) => href === post.href) === index;

/**
 * Get posts. Can be filtered by "group" and "tags". Return posts with backlinks.
 *
 * @param param.all return all posts. It ignores "group" and "tags" params.
 * @param param.group return posts that belong to a group.
 * @param param.tags return posts that have tags.
 */
export const getPosts = ({ all, group, tags }: GetPostsProps = {}) => {
  const sortPosts = (postA: Post, postB: Post) => postB.rating - postA.rating;

  const getGroupAndTagsPosts = () => {
    const groupPosts = group ? getPostsByGroup(group) : [];

    const tagsPosts = tags
      ? allPosts
          /**
           * Return only posts that contain the tags.
           */
          .filter((post) =>
            tags.reduce((acc, tag) => acc || post.tags.includes(tag), false),
          )
      : [];

    return [...tagsPosts.sort(sortPosts), ...groupPosts.sort(sortPosts)].filter(
      removeDuplicatedPosts,
    );
  };

  return (all ? allPosts.sort(sortPosts) : getGroupAndTagsPosts())
    .map((post) => getPost(post))
    .filter((post): post is Post => !!post);
};

export const getAllTags = () =>
  getPosts({ all: true })
    .flatMap(({ tags }) => tags)
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));

export const getRecommendations = (props: GetPostsProps = {}) =>
  getPosts(props)
    /**
     * Do not return the content.
     */
    .map(({ content, ...rest }) => rest)
    /**
     * Limit the number of posts returned.
     */
    .slice(0, LIMIT);

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

  const { tags, backlinks = [] } = post || {};

  const recommendations = post
    ? [...backlinks, ...getRecommendations({ tags, group })]
        /**
         * Don't return the post as recommendation.
         */
        .filter(({ href }) => href !== post?.href)
        /**
         * Remove posts that may come from backlinks and getRecommendation.
         */
        .filter(removeDuplicatedPosts)
    : [];

  return { post, recommendations };
};

export const getDraft = getPartialPost;
