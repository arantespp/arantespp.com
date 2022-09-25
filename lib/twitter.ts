import { SendTweetV2Params, TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
} as any);

export const createTweet = async ({ text }: { text: string }) => {
  const { data: createdTweet } = await client.v2.tweet(text);
  return createdTweet;
};

export const createThread = async ({
  tweets,
}: {
  tweets: (string | SendTweetV2Params)[];
}) => {
  const thread = await client.v2.tweetThread(tweets);
  return thread;
};

export const readTweet = async ({ id }: { id: string }) => {
  const { data: tweet } = await client.v2.singleTweet(id, {
    expansions: ['author_id'],
  });

  return tweet;
};
