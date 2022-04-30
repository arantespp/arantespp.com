/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import * as dateFns from 'date-fns';
import { paramCase } from 'change-case';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { GROUPS, Group } from './groups';
import { getDateWithTimezone } from './getDateWithTimezone';

export const postsDirectory = path.join(process.cwd(), 'posts');

const DOMAIN = 'https://arantespp.com';

const GITHUB_PROJECT = 'https://github.com/arantespp/arantespp.com';

export type { Group };

export type Book = {
  authors: string[];
  link: string;
  image: string;
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
  /**
   * Backlinks are links of posts that referenced the current post. If Post A
   * has Post B and Post C as backlinks, means that Post B and Post C
   * referenced post A.
   */
  backlinks?: PostWithoutContent[];
  /**
   * References used in the text.
   */
  references?: PostWithoutContent[];
  /**
   * Book should have the `null` type because `getStaticProps` do not
   * accept undefined values.
   */
  book?: Book;
  editLink?: string;
  keywords: string[];
  readingTime: number;
  bitLink?: string;
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

export type Recommendation = PostWithoutContent & {
  isReference?: boolean;
};

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

export const getDrafts = (filter: { group?: Group } = {}) =>
  drafts
    /**
     * Remove duplicates.
     */
    .filter(
      ({ group, slug }, index) =>
        index ===
        drafts.findIndex(
          (draft) => draft.group === group && draft.slug === slug,
        ),
    )
    .filter(({ group }) => {
      return filter.group ? filter.group === group : true;
    })
    .map((draft) => ({
      title: 'DRAFT TITLE',
      excerpt: 'DRAFT EXCERPT',
      date: 'DRAFT DATE',
      formattedDate: 'DRAFT FORMATTED DATE',
      tags: [],
      rating: 0,
      backlinks: [],
      references: [],
      keywords: [],
      readingTime: 0,
      ...draft,
      href: `/drafts${draft.href}`,
      draft: true,
    }));

const getDate = (date: string | Date) => {
  const dt = getDateWithTimezone(date);
  return {
    date: dateFns.format(dt, 'yyyy-MM-dd'),
    /**
     * Added formattedDate to don't need to use date-fns in the App.
     */
    formattedDate: dateFns.format(dt, 'MMMM dd, yyyy'),
  };
};

type GetPartialPostProps = {
  group: Group;
  slug: string;
};

const readMarkdown = async ({
  folder,
  filename,
}: {
  folder: string;
  filename: string;
}) => {
  try {
    const fullPath = path.join(postsDirectory, folder, filename);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace('.md', '');
    return { data, content, folder, filename, slug };
  } catch {
    return undefined;
  }
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Markdown = NonNullable<ThenArg<ReturnType<typeof readMarkdown>>>;

const readFolderMarkdowns = async ({ folder }: { folder: string }) => {
  const fullFolderPath = path.join(postsDirectory, folder);
  const filenames = (await fs.promises.readdir(fullFolderPath)).filter((dir) =>
    dir.endsWith('.md'),
  );
  const markdowns = await Promise.all(
    filenames.map((filename) => readMarkdown({ folder, filename })),
  );
  return markdowns;
};

const problems: {
  slug: Array<{ title: string; slug: string; paramCaseTitle: string }>;
} = { slug: [] };

export const getProblems = () => problems;

export const getTags = (tags: string[] = []) =>
  [...tags]
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

/**
 * It does not return backlinks.
 */
export const getPartialPost = ({ group, slug }: GetPartialPostProps) => {
  try {
    const fullPath = path.join(postsDirectory, group || '', `${slug}.md`);
    const href = path.join('/', group === 'blog' ? '' : group, slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const {
      title,
      excerpt,
      date,
      rating,
      tags = [],
      draft,
      book,
      bitLink,
    } = data as PostMeta;

    /**
     * Title and filename doesn't match.
     */
    if (title && slug !== paramCase(title)) {
      problems.slug?.push({ title, slug, paramCaseTitle: paramCase(title) });
      return undefined;
    }

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

    /**
     * Book authors become tags.
     */
    const allTags = getTags([...tags, ...(book?.authors || [])]);

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
      tags: allTags,
      draft,
      book,
      editLink: `${GITHUB_PROJECT}/edit/main/posts${href}.md`,
      url: `${DOMAIN}${href}`,
      keywords: [group, ...tags],
      readingTime: Math.round(readingTime(content).minutes),
      bitLink,
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

    if (!doesPostHaveAllRequiredProperties) {
      post.draft = true;
    }

    if (post.draft) {
      drafts.push(post);
    }

    return post as Post;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return undefined;
  }
};

export const getPostsByGroup = (group: Group) => {
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

export const getAllPosts = () => allPosts;

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

  const references = allPosts.reduce<PostWithoutContent[]>(
    (acc, { content, ...post }) => {
      if (partialPost.content.includes(`(${post.href})`)) {
        return [...acc, post];
      }

      return acc;
    },
    [],
  );

  return { ...partialPost, content: newContent, backlinks, references };
};

/**
 * Generally used to read index.md pages.
 */
export const getFile = (filePath: string) => {
  try {
    const fullPath = path.join(postsDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
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

export const getRecommendations = (
  props: GetPostsProps = {},
): Recommendation[] =>
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

  const { tags, backlinks = [], references = [] } = post || {};

  const filterRecommendations = (recommendations: Recommendation[]) =>
    recommendations
      /**
       * Don't return the post as recommendation.
       */
      .filter(({ href }) => href !== post?.href)
      /**
       * Remove posts that may come from backlinks and getRecommendation.
       */
      .filter(removeDuplicatedPosts);

  const referencesAndBacklinksRecommendations = filterRecommendations([
    ...references.map((reference) => ({ ...reference, isReference: true })),
    ...backlinks,
  ]);

  /**
   * How many recommendations do post need to reach LIMIT recommendations?
   */
  let targetLimit = LIMIT - referencesAndBacklinksRecommendations.length;
  /**
   * If targetLimit is zero or less, return at least one recommendation that
   * is not a reference or a backlink.
   */
  targetLimit = targetLimit <= 0 ? 1 : targetLimit;

  /**
   * `filterRecommendations` is passed to filter posts that could be filtered
   * ahead.
   */
  const recommendationsThatAreNotReferenceOrBacklink = filterRecommendations(
    getRecommendations({
      tags,
      group,
    }).filter(
      (recommendation) =>
        !referencesAndBacklinksRecommendations
          .map(({ href }) => href)
          .includes(recommendation.href),
    ),
  );

  const recommendations = filterRecommendations([
    ...referencesAndBacklinksRecommendations,
    ...recommendationsThatAreNotReferenceOrBacklink.slice(0, targetLimit),
  ]);

  return { post, recommendations };
};

export const getDraft = getPartialPost;

export const getInstagramPost = async ({ slug }: { slug: string }) => {
  const markdown = await readMarkdown({
    folder: 'instagram',
    filename: `${slug}.md`,
  });

  if (!markdown) {
    return undefined;
  }

  const { data, ...rest } = markdown;
  const {
    title,
    url,
    instagramUrl = null,
    image,
  } = data as {
    title: string;
    image: string;
    url: string;
    instagramUrl?: string;
  };
  return { title, url, instagramUrl, image, ...rest };
};

export type InstagramPost = NonNullable<
  ThenArg<ReturnType<typeof getInstagramPost>>
>;

export const getInstagramPosts = async () => {
  try {
    const markdowns = await readFolderMarkdowns({ folder: 'instagram' });
    return markdowns.filter((markdown): markdown is Markdown => !!markdown);
  } catch {
    return [];
  }
};
