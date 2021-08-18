import { paramCase } from 'change-case';
import * as dateFns from 'date-fns';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';
import { titleCase } from 'title-case';

import type { Note } from '../components/NotesGenerator';

import { getTags, postsDirectory } from './files';

export const saveNote = async ({ notes, references, ...meta }: Note) => {
  /**
   * Meta
   */
  const { rating, excerpt } = meta;
  const title = titleCase(meta.title);
  const date = dateFns.format(new Date(), 'yyyy-MM-dd');
  const tags = getTags(meta.tags.split(';'));

  /**
   * Body
   */
  let body = `\n## Notes\n\n${notes}`;
  if (references) {
    body += `\n\n## References\n\n${references}`;
  }

  const md = matter.stringify(body, {
    title: titleCase(title),
    date,
    excerpt,
    rating,
    tags,
  });

  const fileName = paramCase(title);
  const href = `/zettelkasten/${fileName}`;
  const filePath = path.join(postsDirectory, `${href}.md`);

  await fs.promises.writeFile(filePath, md);

  return { href };
};
