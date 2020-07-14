/**
 * https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/
 */
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = join(process.cwd(), '_posts');

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostBySlug = (slug, fields = []) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
};

export const getAllPosts = (fields = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};

export const markdownToHtml = async (markdown) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};
