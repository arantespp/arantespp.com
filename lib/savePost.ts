import * as dateFns from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';
import { Book, Post, getPost, normalizeTags, postsDirectory } from './files';
import { Group } from './groups';
import { postTitleToSlug } from './postTitleToSlug';
import { titleCase } from 'title-case';
import matter from 'gray-matter';
import type { PostForm } from '../src/components/PostEditor';

export const savePost = async ({ content, ...meta }: PostForm) => {
  const { group, book } = meta;

  const title = titleCase(meta.title.trim());
  const date = meta.date || dateFns.format(new Date(), 'yyyy-MM-dd');
  const tags = normalizeTags(meta.tags?.split(';'));

  const mdMeta: Partial<Post> = {
    ...(meta as Partial<Post>),
    title,
    date,
    tags,
  };

  /**
   * Remove undefined values from the meta object, else we get the error:
   * "unacceptable kind of an object to dump [object Undefined]"
   */
  Object.entries(mdMeta).forEach(([key, value]) => {
    if (value === undefined) {
      delete mdMeta[key];
    }
  });

  if ((group as Group) === 'books') {
    mdMeta.book = book as Book;
  }

  const md = matter.stringify(content, mdMeta);

  const slug = postTitleToSlug(title);
  const href = `/${group}/${slug}`;
  const filePath = path.join(postsDirectory, `${href}.md`);

  await fs.promises.writeFile(filePath, md);

  return getPost({ group: group as Group, slug });
};
