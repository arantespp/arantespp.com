import { postsDirectory } from './postsDirectory';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const readMarkdown = async ({
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
