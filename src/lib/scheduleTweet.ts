import * as dateFns from 'date-fns';
import TwitterAdsAPI from 'twitter-ads';

const twitter = new TwitterAdsAPI({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  sandbox: false,
  api_version: '10',
});

const getScheduledDate = (): string => {
  const today = new Date();
  /**
   * Random days between 1 and 14.
   */
  const addRandomDays = Math.round(Math.random() * (14 - 1) + 1);
  /**
   * Random hour between 6h and 11h.
   */
  const randomHour = Math.round(Math.random() * (11 - 6) + 6);
  const scheduledDate = dateFns.addBusinessDays(today, addRandomDays);
  scheduledDate.setHours(randomHour);
  return dateFns.formatISO(scheduledDate);
};

export const scheduleTweet = async ({ tweet }: { tweet: string }) => {
  const scheduledAt = getScheduledDate();

  const params = new URLSearchParams({
    scheduled_at: scheduledAt,
    as_user_id: process.env.TWITTER_USER_ID,
    text: tweet,
  } as any);

  const { request, data } = await new Promise((resolve, reject) => {
    twitter.post(
      `accounts/:account_id/scheduled_tweets?${params.toString()}`,
      {
        account_id: process.env.TWITTER_ACCOUNT_ID,
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

  return { request, data };
};
