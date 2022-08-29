import { Markdown, readMarkdown } from './readMarkdown';
import { readFolderMarkdowns } from './readFolderMarkdowns';

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

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

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
