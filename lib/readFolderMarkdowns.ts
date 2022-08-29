import { Markdown, readMarkdown } from './readMarkdown';
import { postsDirectory } from './postsDirectory';
import fs from 'fs';
import path from 'path';

export type { Markdown };

export const readFolderMarkdowns = async ({ folder }: { folder: string }) => {
  const fullFolderPath = path.join(postsDirectory, folder);

  const filenames = (await fs.promises.readdir(fullFolderPath)).filter((dir) =>
    dir.endsWith('.md'),
  );

  const markdowns = (
    await Promise.all(
      filenames.map((filename) => readMarkdown({ folder, filename })),
    )
  ).filter((markdown): markdown is Markdown => !!markdown);

  return markdowns;
};
