import TwitterAdsAPI from 'twitter-ads';

const twitter = new TwitterAdsAPI({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  sandbox: false,
  api_version: '10',
});

export const scheduleTweet = async ({ accountId }: { accountId: string }) => {
  const p = await new Promise((resolve, reject) => {
    twitter.post(
      'accounts/:account_id/scheduled_tweets?scheduled_at=2021-12-02&as_user_id=:userId&text="Hello World"',
      {
        account_id: accountId,
      },
      (error, resp, body) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(body);
      },
    );
  });

  console.log(p);
};
