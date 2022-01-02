import * as dateFns from 'date-fns';
import TwitterAdsAPI from 'twitter-ads';

import { getRandomInt, getWeightedRandomInt } from './getRandomInt';

const twitter = new TwitterAdsAPI({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  sandbox: false,
  api_version: '10',
});

const ONE_WEEK = 7;

/**
 * It'll schedule tweets for the next `SCHEDULE_RANGE` days.
 */
export const SCHEDULE_RANGE = 12 * ONE_WEEK;

/**
 * Schedule a tweet from `SCHEDULE_FROM` days from now. The goal is to give
 * a space to forget about the content of the tweet before reading it again.
 */
export const SCHEDULE_FROM = 4 * ONE_WEEK;

export const WEEKEND_PROPORTION = 0.28;

export const SKIP_DAYS = ['12-24', '12-25', '12-26', '12-30', '12-31', '01-01'];

export const shouldSkipDay = (date: Date) => {
  const day = dateFns.format(date, 'MM-dd');
  return SKIP_DAYS.includes(day);
};

export const getScheduledDate = (): string => {
  const today = new Date();

  /**
   * We'll schedule tweets from tomorrow.
   */
  let scheduledDate = dateFns.addDays(today, SCHEDULE_FROM);

  /**
   * With these weights, we get a probability of 10% to get a weekend.
   * The probabilities are [5%, 18%, 18%, 18%, 18%, 18%, 5%].
   */
  const weights = [...new Array(SCHEDULE_RANGE)].map((_, i) => {
    const currentDate = dateFns.addDays(scheduledDate, i);
    const day = dateFns.getDay(currentDate);

    if (day === 0 || day === 6) {
      return WEEKEND_PROPORTION;
    }

    return 1;
  });

  const randomAddDay = getWeightedRandomInt(weights);

  /**
   * We'll add a random day to the scheduled date.
   */
  scheduledDate = dateFns.addDays(scheduledDate, randomAddDay);

  /**
   * Set random hour.
   * 7h UTC = 4h America/Sao_Paulo
   * 20h UTC = 17h America/Sao_Paulo
   */
  const setRandomHour = getRandomInt({ min: 7, max: 20 });
  scheduledDate = dateFns.setHours(scheduledDate, setRandomHour);
  scheduledDate = dateFns.subMinutes(scheduledDate, today.getTimezoneOffset());

  /**
   * Set random minute.
   */
  const setRandomMinute = getRandomInt({ min: 0, max: 59 });
  scheduledDate = dateFns.setMinutes(scheduledDate, setRandomMinute);

  if (shouldSkipDay(scheduledDate)) {
    return getScheduledDate();
  }

  return dateFns.formatISO(scheduledDate);
};

export const scheduleTweet = async ({ tweet }: { tweet: string }) => {
  const scheduledAt = getScheduledDate();

  const params = new URLSearchParams({
    scheduled_at: scheduledAt,
    as_user_id: process.env.TWITTER_USER_ID,
    text: tweet,
    nullcast: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
