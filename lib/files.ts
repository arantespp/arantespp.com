import * as dateFns from 'date-fns';
import { GROUPS, Group } from './groups';
import { getDateWithTimezone } from './getDateWithTimezone';
import { paramCase } from 'change-case';
import { titleCase } from 'title-case';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

export type { Group };

const DOMAIN = 'https://arantespp.com';

const GITHUB_PROJECT = 'https://github.com/arantespp/arantespp.com';

export const postsDirectory = path.join(process.cwd(), 'posts');

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

/**
 * Group Posts
 */
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

export const normalizeTags = (tags: string[] = []) =>
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

type GroupPostParams = {
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

type GroupPostMarkdownMeta = Partial<{
  title: string;
  excerpt: string;
  draft: boolean;
  date: string;
  tags: string[];
  book: Book;
  bitLink: string;
}>;

const requiredPostProperties = [
  'title',
  'excerpt',
  'date',
  'formattedDate',
  'tags',
  'content',
] as const;

const readGroupPost = async ({ group, slug }: GroupPostParams) => {
  try {
    const pathFromPostsDirectory = path.join(group, `${slug}.md`);
    const fullPath = path.join(postsDirectory, pathFromPostsDirectory);
    const href = path.join('/', group === 'blog' ? '' : group, slug);
    const markdownFile = await readMarkdownFile(pathFromPostsDirectory);

    if (!markdownFile) {
      return undefined;
    }

    const { data, content } = markdownFile;

    const {
      title,
      excerpt = '',
      date,
      tags = [],
      draft,
      book,
      bitLink,
    } = data as GroupPostMarkdownMeta;

    /**
     * Title and filename doesn't match.
     */
    if (title && slug !== paramCase(title)) {
      insertFileProblem({ description: `${slug} and ${title} don't match` });
      return undefined;
    }

    const { mtime } = await fs.promises.stat(fullPath);
    const { formattedDate: updatedAt } = getDate(mtime);

    /**
     * Add book image.
     */
    (() => {
      if (!book) {
        return;
      }

      /**
       * Check if image with same post name exists.
       */
      ['webp', 'jpg', 'png'].forEach((ext) => {
        if (book.image) {
          return;
        }

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
    const allTags = normalizeTags([...tags, ...(book?.authors || [])]);

    const post = {
      title: titleCase(title || ''),
      excerpt,
      ...(date ? getDate(date) : {}),
      updatedAt,
      updateHistory: `${GITHUB_PROJECT}/commits/main/posts/${group}/${slug}.md`,
      href,
      group,
      slug,
      content,
      tags: allTags,
      draft,
      book,
      editLink: `${GITHUB_PROJECT}/edit/main/posts/${group}/${slug}.md`,
      url: `${DOMAIN}${href}`,
      keywords: [group, ...tags],
      readingTime: Math.round(readingTime(content).minutes) || 1,
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

    const doesPostHaveAllRequiredProperties = requiredPostProperties.reduce(
      (acc, property) => acc && !!post[property],
      true,
    );

    if (!post.draft) {
      post.draft = !doesPostHaveAllRequiredProperties;
    }

    return post;
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
  ThenArg<ReturnType<typeof readGroupPost>>
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
  typeof requiredPostProperties[number]
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
        return readGroupPost({ group, slug });
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

const getGroupPostsFromMarkdown = async ({
  group,
  draft,
}: {
  group?: Group;
  draft?: boolean;
} = {}): Promise<GroupPostFromMarkdown[]> => {
  if (!_allGroupPostsFromMarkdown) {
    _allGroupPostsFromMarkdown = (
      await Promise.all(GROUPS.map((g) => readAllPostsByGroup(g)))
    )
      .flatMap((groupPosts) => {
        return groupPosts;
      })
      .sort(sortByMostRecentFirst);
  }

  return _allGroupPostsFromMarkdown
    .filter(filterByGroup(group))
    .filter((post) => !!post.draft === !!draft)
    .sort(sortByMostRecentFirst);
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

  return normalizeTags(tags);
};

export const getDrafts = async ({ group }: { group?: Group } = {}) => {
  return (await getGroupPostsFromMarkdown({ draft: true })).filter(
    filterByGroup(group),
  );
};

export const getDraft = async ({ group, slug }: GroupPostParams) => {
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

const RECOMMENDATIONS_LIMIT = 7;

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
  };
};

export const getRecommendations = async ({
  group,
  tag,
}: { group?: Group; tag?: string } = {}) => {
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
    .slice(0, RECOMMENDATIONS_LIMIT);

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

  const post = allPosts.find(
    (post) => post.group === params.group && post.slug === params.slug,
  );

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
    blog: 1,
    books: 2,
    zettel: 0,
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
