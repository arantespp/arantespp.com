import { sharePost } from './linkedIn';

export type DailyPostInput = {
  linkedInAccessToken: string;
  linkedInText: string;
  blogPostUrl: string;
};

export const handleDailyPost = async ({
  linkedInAccessToken,
  linkedInText,
  blogPostUrl,
}: DailyPostInput) => {
  const linkedInResponse = await sharePost({
    accessToken: linkedInAccessToken,
    text: linkedInText,
    blogPostUrl,
  });

  const response = {
    linkedInPostUrl: `https://www.linkedin.com/feed/update/${linkedInResponse.id}/`,
  };

  return response;
};

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type DailyPostOutput = AsyncReturnType<typeof handleDailyPost>;
