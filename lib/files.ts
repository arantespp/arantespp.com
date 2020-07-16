/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsGroups = () => {
  return fs.readdirSync(postsDirectory);
};

const getMarkdownData = ({ group, slug }: { group: string; slug: string }) => {
  const fullPath = path.join(postsDirectory, group, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const href = path.join('/', group, slug);
  return { content, metadata: { ...data, group, slug, href } };
};

export const getGroupPresentation = (group: string) => {
  const { content } = getMarkdownData({ group, slug: 'index' });
  return { content };
};

type Post = {
  content?: string;
  metadata: any;
};

const getPostsGroupsSlugs = (group: string) => {
  return fs
    .readdirSync(path.join(postsDirectory, group))
    .map((dir) => dir.replace(/\.md$/, ''));
};

export const getPosts = ({
  group,
  onlyMetadata = false,
}: {
  group?: {
    name: string;
    slug?: string;
  };
  onlyMetadata?: boolean;
}): Post[] => {
  const getPostsByGroup = (groupName: string) => {
    return getPostsGroupsSlugs(groupName)
      .filter((slug) => slug !== 'index')
      .map((slug) => {
        return getMarkdownData({ group: groupName, slug });
      });
  };

  const posts: Post[] = (() => {
    if (group) {
      if (group.slug) {
        return [getMarkdownData({ group: group.name, slug: group.slug })];
      }

      return getPostsByGroup(group.name);
    }

    return getPostsGroups().reduce(
      (acc, groupName) => [...acc, ...getPostsByGroup(groupName)],
      []
    );
  })();

  return posts
    .map((post) => {
      if (onlyMetadata) {
        const { content, ...rest } = post;
        return { ...rest };
      }
      return post;
    })
    .sort((post1, post2) => {
      if (!post1.metadata.date || !post2.metadata.date) {
        return 0;
      }
      return post1.metadata.date > post2.metadata.date ? -1 : 1;
    });
};
