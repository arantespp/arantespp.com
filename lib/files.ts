import * as dateFns from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';
import { GROUPS, Group } from './groups';
import { getDateWithTimezone } from './getDateWithTimezone';
import { normalizeTags } from './normalizeTags';
import { paramCase } from 'change-case';
import { postTitleToSlug } from './postTitleToSlug';
import { postsDirectory } from './postsDirectory';
import { titleCase } from 'title-case';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type { Group };

const DOMAIN = 'https://arantespp.com';

const GITHUB_PROJECT = 'https://github.com/arantespp/arantespp.com';

const RECOMMENDATIONS_LIMIT = 5;

export const readMarkdownFile = async (filePathFromPostsDirectory: string) => {
  try {
    const fullPath = path.join(postsDirectory, filePathFromPostsDirectory);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { data, content };
  } catch (err) {
    return undefined;
  }
};

/**
 * Files Problems
 */
const _problems: any = [];

const insertFileProblem = async ({ description }: { description: string }) => {
  _problems.push(description);
};

type ReadPostParams = {
  group: Group;
  slug: string;
};

export type Book = {
  authors: string[];
  link: string;
  image?: string;
  ASIN?: string;
  ISBN?: string;
};

type SimplePost = {
  title: string;
  group: Group;
  /**
   * Slug is derived from the title, so it can be optional.
   */
  slug?: string;
  excerpt?: string;
  draft?: boolean;
  date?: string;
  tags?: string[];
  book?: Book;
  bitLink?: string;
  content?: string;
};

const requiredPostPropertiesToNotBeADraft = [
  'title',
  'excerpt',
  'date',
  'tags',
  'content',
] as const;

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

const getPostWithAllMeta = (post: SimplePost) => {
  let { title, group } = post;

  if (!title || !group) {
    return undefined;
  }

  title = titleCase(title.trim());

  const slug = post.slug || postTitleToSlug(title);

  /**
   * Title and filename doesn't match.
   */
  if (title && slug !== paramCase(title)) {
    insertFileProblem({ description: `${slug} and ${title} don't match` });
    return undefined;
  }

  const { date, formattedDate } = getDate(post.date || new Date());

  const draft = (() => {
    if (post.draft) {
      return true;
    }

    const postHasAllRequiredProperties =
      requiredPostPropertiesToNotBeADraft.reduce(
        (acc, property) => acc && !!post[property],
        true,
      );

    if (!postHasAllRequiredProperties) {
      return true;
    }

    return false;
  })();

  const tags = normalizeTags([
    ...(post.tags || []),
    ...(post.book?.authors || []),
  ]);

  const href = path.join(
    '/',
    draft ? 'drafts' : '',
    group === 'blog' ? '' : group,
    slug,
  );

  const content = post.content || '';

  const excerpt = post.excerpt || '';

  const postWithAllMeta = {
    title,
    group,
    slug,
    date,
    formattedDate,
    excerpt,
    draft,
    tags,
    href,
    book: post.book,
    url: `${DOMAIN}${href}`,
    updateHistory: `${GITHUB_PROJECT}/commits/main/posts/${group}/${slug}.md`,
    editLink: `${GITHUB_PROJECT}/edit/main/posts/${group}/${slug}.md`,
    readingTime: Math.round(readingTime(content).minutes) || 1,
    content,
    bitLink: post.bitLink,
  };

  /**
   * Add book image.
   */
  if (postWithAllMeta.book) {
    /**
     * Check if image with same post name exists.
     */
    ['webp', 'jpg', 'png'].forEach((ext) => {
      if (postWithAllMeta.book?.image) {
        return;
      }

      const imageUrl = path.join('/', 'images', group, `${slug}.${ext}`);
      const imageDir = path.join(process.cwd(), 'public', imageUrl);

      if (fs.existsSync(imageDir) && postWithAllMeta.book) {
        postWithAllMeta.book.image = imageUrl;
      }
    });
  }

  /**
   * Remove all properties that are undefined.
   */
  Object.keys(postWithAllMeta).forEach((key) => {
    if (postWithAllMeta[key] === undefined) {
      delete postWithAllMeta[key];
    }
  });

  return postWithAllMeta;
};

const readPost = async ({ group, slug }: ReadPostParams) => {
  try {
    if (!group || !slug) {
      return undefined;
    }

    const pathFromPostsDirectory = path.join(group, `${slug}.md`);

    const markdownFile = await readMarkdownFile(pathFromPostsDirectory);

    if (!markdownFile) {
      return undefined;
    }

    const meta = markdownFile.data as Partial<SimplePost>;

    const { title } = meta;

    if (!title) {
      return undefined;
    }

    const postWithAllMeta = getPostWithAllMeta({
      ...meta,
      title,
      group,
      content: markdownFile.content,
    });

    return postWithAllMeta;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * GroupPosts when read from markdown file. It doesn't have backlinks and
 * references, for example.
 */
type GroupPostFromMarkdownOptional = NonNullable<
  ThenArg<ReturnType<typeof readPost>>
>;

/**
 * https://stackoverflow.com/a/69328045/8786986
 */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Make the properties that set a post as draft required, once the posts which
 * don't have all required properties were set as draft.
 */
type GroupPostFromMarkdown = WithRequired<
  GroupPostFromMarkdownOptional,
  typeof requiredPostPropertiesToNotBeADraft[number]
>;

const readAllPostsByGroup = async (group: Group) => {
  const allSlugsInsideGroupFolder =
    /**
     * Read all files inside group folder.
     */
    (await fs.promises.readdir(path.join(postsDirectory, group)))
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
      .filter((slug) => slug !== 'index');

  const allPostsByGroup = (
    await Promise.all(
      allSlugsInsideGroupFolder.map((slug) => {
        return readPost({ group, slug });
      }),
    )
  )
    /**
     * Return only posts that are not null or undefined.
     */
    .filter((post): post is GroupPostFromMarkdown => !!post);

  return allPostsByGroup;
};

const sortByMostRecentFirst = (a: Post, b: Post) => {
  if (!a.date || !b.date) {
    return 0;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateRegex.test(a.date) && dateRegex.test(b.date)) {
    return b.date.localeCompare(a.date);
  }

  /**
   * If the dates are not in the format YYYY-MM-DD, because it is a draft.
   */
  if (!dateRegex.test(a.date)) {
    return 2;
  }

  if (!dateRegex.test(b.date)) {
    return -2;
  }

  return 0;
};

const filterByGroup = (group?: Group) => (post: GroupPostFromMarkdown) => {
  if (!group) {
    return true;
  }

  return post.group === group;
};

let _allGroupPostsFromMarkdown: GroupPostFromMarkdown[];

const readAllPostsGroups = async () => {
  return (await Promise.all(GROUPS.map((g) => readAllPostsByGroup(g))))
    .flatMap((groupPosts) => {
      return groupPosts;
    })
    .sort(sortByMostRecentFirst);
};

const getGroupPostsFromMarkdown = async ({
  group,
  draft,
}: {
  group?: Group;
  draft?: boolean;
} = {}): Promise<GroupPostFromMarkdown[]> => {
  if (!_allGroupPostsFromMarkdown) {
    _allGroupPostsFromMarkdown = await readAllPostsGroups();
  }

  return _allGroupPostsFromMarkdown
    .filter(filterByGroup(group))
    .filter((post) => !!post.draft === !!draft)
    .sort(sortByMostRecentFirst);
};

/**
 * It could receive all posts properties.
 */
export type SavePostParams = SimplePost & Partial<Post>;

export const savePost = async (post: SavePostParams) => {
  const postWithAllMeta = getPostWithAllMeta(post);

  if (!postWithAllMeta) {
    throw new Error('Post is not valid');
  }

  const { content, ...meta } = postWithAllMeta;

  /**
   * Remove undefined properties to avoid errors.
   * - YAMLException: unacceptable kind of an object to dump [object Undefined]
   */
  Object.keys(meta).forEach((key) => {
    if (!meta[key]) {
      delete meta[key];
    }
  });

  const md = matter.stringify(content, meta);

  const filePath = path.join(postsDirectory, meta.group, `${meta.slug}.md`);

  await fs.promises.writeFile(filePath, md);

  return postWithAllMeta;
};

export const getAllTags = async () => {
  const allMarkdownPosts = await getGroupPostsFromMarkdown({ draft: false });

  const tags = allMarkdownPosts
    .flatMap((post) => post.tags)
    /**
     * Remove duplicates.
     */
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));

  /**
   * Add the tags that is the same as the post slug if all tags contains it
   * but not the post.
   */
  await Promise.all(
    allMarkdownPosts.map(async (post) => {
      const postTags = post.tags || [];

      const allTagsContainsPostSlug = tags.includes(post.slug);

      const postTagsContainsPostSlug = postTags.includes(post.slug);

      if (allTagsContainsPostSlug && !postTagsContainsPostSlug) {
        postTags.push(post.slug);

        await savePost({
          ...post,
          tags: postTags,
        });
      }
    }),
  );

  return normalizeTags(tags);
};

export const getDrafts = async ({ group }: { group?: Group } = {}) => {
  return (await getGroupPostsFromMarkdown({ draft: true })).filter(
    filterByGroup(group),
  );
};

export const getDraft = async ({ group, slug }: ReadPostParams) => {
  const drafts = await getDrafts({ group });
  return drafts.find((draft) => draft.slug === slug);
};

export type Draft = GroupPostFromMarkdown;

const addFinalParametersToPost = async (post: GroupPostFromMarkdown) => {
  const allMarkdownGroupPosts = await getGroupPostsFromMarkdown({
    draft: false,
  });

  /**
   * Array of all hrefs that `post` use as references.
   */
  const references = allMarkdownGroupPosts.reduce((acc, { href }) => {
    if (post.content.includes(`(${href})`)) {
      return [href, ...acc];
    }

    return acc;
  }, []);

  /**
   * Add backlinks to post. `Post` component will render backlinks.
   */
  const backlinks = allMarkdownGroupPosts
    .filter(({ content }) => content.includes(`(${post.href})`))
    .map(({ href, title }) => ({ title, href }));

  return { ...post, references, backlinks };
};

export type Post = NonNullable<
  ThenArg<ReturnType<typeof addFinalParametersToPost>>
>;

let _allPosts: Post[];

export const getPosts = async ({ group }: { group?: Group } = {}) => {
  if (!_allPosts) {
    const allMarkdownGroupPosts = await getGroupPostsFromMarkdown({
      draft: false,
    });

    _allPosts = await Promise.all(
      allMarkdownGroupPosts.map(addFinalParametersToPost),
    );
  }

  return _allPosts.filter(filterByGroup(group));
};

const getOnlyRecommendationProperties = (post: Post) => {
  const {
    title,
    excerpt,
    tags,
    group,
    href,
    draft,
    formattedDate,
    readingTime,
    url,
  } = post;

  return {
    title,
    excerpt,
    tags,
    group,
    href,
    draft,
    formattedDate,
    readingTime,
    url,
  };
};

export const getRecommendations = async ({
  group,
  tag,
  limit = RECOMMENDATIONS_LIMIT,
}: { group?: Group; tag?: string; limit?: number } = {}) => {
  const fullRecommendations = await (async () => {
    if (tag) {
      const allPosts = await getPosts();
      return allPosts.filter(({ tags }) => tags.includes(tag));
    }

    if (group) {
      /**
       * Group recommendations.
       */
      return getPosts({ group });
    }

    return getPosts({ group: 'blog' });
  })();

  const recommendations = fullRecommendations
    .map(getOnlyRecommendationProperties)
    .slice(0, limit);

  return recommendations;
};

export type Recommendation = { isReference?: boolean } & NonNullable<
  ThenArg<ReturnType<typeof getRecommendations>>
>[number];

type GetPostParams =
  | {
      group: Group;
      slug: string;
    }
  | { href: string }
  | { title: string };

export const getPost = async (params: GetPostParams) => {
  const allPosts = [...(await getPosts()), ...(await getDrafts())] as Post[];

  if ('href' in params) {
    return allPosts.find((post) => post.href === params.href);
  }

  if ('title' in params) {
    return allPosts.find((post) => post.title === params.title);
  }

  /**
   * Read post again from markdown.
   */
  const post = await readPost(params);

  if (post) {
    return addFinalParametersToPost(post);
  }

  return post;
};

export const getPostAndRecommendations = async (params: GetPostParams) => {
  const [post, allPosts] = await Promise.all([getPost(params), getPosts()]);

  const scoreMap = allPosts.reduce<{ [key: string]: number }>(
    (acc, { href }) => {
      acc[href] = 0;
      return acc;
    },
    {},
  );

  post?.references.forEach((reference) => {
    scoreMap[reference] += 6;
  });

  post?.backlinks.forEach((backlink) => {
    scoreMap[backlink.href] += 3;
  });

  post?.tags.forEach((tag) => {
    allPosts.forEach(({ tags, href }) => {
      if (tags.includes(tag)) {
        scoreMap[href] += 1;
      }
    });
  });

  const groupScore: { [key in Group]: number } = {
    blog: 2,
    books: 1,
    zettel: 1,
  };

  const recommendations = Object.entries(scoreMap)
    .map(([href, score]) => {
      const post = allPosts.find((post) => post.href === href);
      return [post, score] as const;
    })
    .sort(([postA, scoreA], [postB, scoreB]) => {
      /**
       * If the score is the same, sort by group.
       */
      if (scoreA === scoreB && postA && postB) {
        return groupScore[postB.group] - groupScore[postA.group];
      }

      return scoreB - scoreA;
    })
    .filter(([post, score]) => !!post && score > 0)
    .map(([post]) => getOnlyRecommendationProperties(post as Post))
    /**
     * Remove itself from recommendations.
     */
    .filter(({ href }) => href !== post?.href)
    .slice(0, RECOMMENDATIONS_LIMIT)
    .map((recommendation) => {
      return {
        ...recommendation,
        isReference:
          post?.references.includes(recommendation.href) ||
          post?.backlinks.some(({ href }) => href === recommendation.href),
      };
    });

  return { post, recommendations };
};
