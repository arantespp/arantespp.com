import * as dateFns from 'date-fns';
import TwitterAdsAPI from 'twitter-ads';

import { getRandomInt } from './getRandomInt';

const twitter = new TwitterAdsAPI({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  sandbox: false,
  api_version: '10',
});

export const MIN_DIFF_IN_DAYS = 2;

export const getScheduledDate = (): string => {
  const today = new Date();

  /**
   * Add a random number of weeks.
   */
  const addRandomWeeks = getRandomInt({ min: 0, max: 5 });
  let scheduledDate = dateFns.addWeeks(today, addRandomWeeks);

  /**
   * Set random weed day.
   */
  const setRandomWeekDay = getRandomInt({ min: 1, max: 5 });
  scheduledDate = dateFns.setDay(scheduledDate, setRandomWeekDay);

  /**
   * Set random hour.
   */
  const setRandomHour = getRandomInt({ min: 6, max: 10 });
  scheduledDate = dateFns.setHours(scheduledDate, setRandomHour);

  /**
   * Set random minute.
   */
  const setRandomMinute = getRandomInt({ min: 0, max: 59 });
  scheduledDate = dateFns.setMinutes(scheduledDate, setRandomMinute);

  /**
   * At least three days after the creation date.
   */
  if (dateFns.differenceInDays(scheduledDate, today) <= MIN_DIFF_IN_DAYS) {
    scheduledDate = new Date(getScheduledDate());
  }

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
