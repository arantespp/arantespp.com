import { addItemToIssue } from './revue';
import { createThread, readTweet } from './twitter';
import { sharePost } from './linkedIn';

export type DailyPostInput = {
  linkedInAccessToken: string;
  linkedInText: string;
  blogPostUrl: string;
  tweets: { text: string }[];
};

export const handleDailyPost = async ({
  linkedInAccessToken,
  linkedInText,
  blogPostUrl,
  tweets,
}: DailyPostInput) => {
  const shareLinkedInPost = async () => {
    const linkedInResponse = await sharePost({
      accessToken: linkedInAccessToken,
      text: linkedInText,
      blogPostUrl,
    });

    return `https://www.linkedin.com/feed/update/${linkedInResponse.id}/`;
  };

  const postThread = async () => {
    const thread = await createThread({
      tweets: [...tweets, { text: `Reference ${blogPostUrl}` }],
    });

    const { author_id: authorId } = await readTweet({
      id: thread[0].data.id,
    });

    return `https://twitter.com/${authorId}/status/${thread[0].data.id}`;
  };

  const [, linkedInPostUrl, tweetUrl] = await Promise.all([
    addItemToIssue({ url: blogPostUrl }),
    shareLinkedInPost(),
    postThread(),
  ]);

  const response = {
    linkedInPostUrl,
    tweetUrl,
  };

  return response;
};

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type DailyPostOutput = AsyncReturnType<typeof handleDailyPost>;
