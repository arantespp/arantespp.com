import { paramCase } from 'change-case';
import * as dateFns from 'date-fns';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';
import { titleCase } from 'title-case';

import type { PostForm } from '../components/PostEditor';

import { getTags, postsDirectory } from './files';

export const savePost = async ({ content, ...meta }: PostForm) => {
  const { rating, excerpt, group } = meta;
  const title = titleCase(meta.title);
  const date = dateFns.format(new Date(), 'yyyy-MM-dd');
  const tags = getTags(meta.tags.split(';'));

  const md = matter.stringify(content, {
    title: titleCase(title),
    date,
    excerpt,
    rating,
    tags,
  });

  const fileName = paramCase(title);
  const href = `/${group}/${fileName}`;
  const filePath = path.join(postsDirectory, `${href}.md`);

  await fs.promises.writeFile(filePath, md);

  return { href };
};