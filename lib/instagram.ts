import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const postsDirectory = path.join(process.cwd(), 'posts');

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
