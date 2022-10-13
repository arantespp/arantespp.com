/* eslint-disable camelcase */
import * as dateFns from 'date-fns';
import TwitterAdsAPI from 'twitter-ads';

import { getRandomInt, getWeightedRandomInt } from './getRandomInt';

const twitter = new TwitterAdsAPI({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_KEY_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  sandbox: false,
  api_version: '11',
});

const ONE_WEEK = 7;

/**
 * It'll schedule tweets for the next `SCHEDULE_RANGE` days.
 */
export const SCHEDULE_RANGE = 12 * ONE_WEEK; // Three months.

/**
 * Schedule a tweet from `SCHEDULE_FROM` days from now. The goal is to give
 * a space to forget about the content of the tweet before reading it again.
 */
export const SCHEDULE_FROM = 1 * ONE_WEEK;

/**
 * The probability to schedule a tweet on weekends.
 *
 * For example:
 *
 * 1. If we had chosen WEEKEND_PROBABILITY = 0.1, then we would have
 * the probabilities [5%, 18%, 18%, 18%, 18%, 18%, 5%].
 *
 * 2. If we had chosen WEEKEND_PROBABILITY = 0.05, then we would have
 * the probabilities [2,5%, 19%, 19%, 19%, 19%, 19%, 2,5%].
 *
 * The number of schedules tweets per day given the amount of tweets (n) is:
 * - weekday: SINGLE_WEEKDAY_PROBABILITY * 7 * n
 * - weekend: SINGLE_WEEKEND_PROBABILITY * 7 * n
 *
 * If we had chosen example 1., we would have:
 *
 * - weekday: 1,26 * n
 * - weekend: 0,35 * n
 *
 * | n | weekday | weekend |
 * |---|---------|---------|
 * | 1 | 1.26    | 0.35    |
 * | 2 | 2.52    | 0.70    |
 * | 3 | 3.78    | 1.05    |
 * | 4 | 5.04    | 1.40    |
 * | 5 | 6.30    | 1.75    |
 * | 6 | 7.56    | 2.10    |
 * | 7 | 8.82    | 2.45    |
 * | 8 | 10.08   | 2.80    |
 * | 9 | 11.34   | 3.15    |
 * | 10| 12.60   | 3.50    |
 * -------
 *
 * If we had chosen example 2., we would have:
 *
 * - weekday: 1,33 * n
 * - weekend: 0,175 * n
 *
 * | n | weekday | weekend |
 * |---|---------|---------|
 * | 1 | 1.33    | 0.175   |
 * | 2 | 2.66    | 0.35    |
 * | 3 | 3.99    | 0.525   |
 * | 4 | 5.32    | 0.70    |
 * | 5 | 6.65    | 0.875   |
 * | 6 | 7.98    | 1.05    |
 * | 7 | 9.31    | 1.225   |
 * | 8 | 10.64   | 1.4     |
 * | 9 | 11.97   | 1.575   |
 * | 10| 13.30   | 1.75    |
 * -------
 */
const WEEKEND_PROBABILITY = 0.05;

/**
 * This value means that, to achieve the `WEEKEND_PROBABILITY` goal, we need to
 * have the proportion of tweets on weekdays and weekends equals to:
 * 1:WEEKEND_PROPORTION.
 *
 * The number of schedules tweets per day given the amount of tweets (n) is:
 * - weekday: 1,26 * n
 * - weekend: 0,35 * n
 *
 * | n | weekday | weekend |
 * |---|---------|---------|
 * | 1 | 1,26    | 0,35    |
 * | 2 | 2,52    | 0,70    |
 * | 3 | 3,78    | 1,05    |
 * | 4 | 5,04    | 1,40    |
 * | 5 | 6,30    | 1,75    |
 * | 6 | 7,56    | 2,10    |
 * | 7 | 8,82    | 2,45    |
 * | 8 | 10,08   | 2,80    |
 * | 9 | 11,34   | 3,15    |
 * | 10| 12,60   | 3,50    |
 * -------
 */
export const WEEKEND_PROPORTION =
  (5 * WEEKEND_PROBABILITY) / (1 - WEEKEND_PROBABILITY) / 2;

export const SKIP_DAYS = ['12-24', '12-25', '12-26', '12-30', '12-31', '01-01'];

export const shouldSkipDay = (date: Date) => {
  const day = dateFns.format(date, 'MM-dd');
  return SKIP_DAYS.includes(day);
};

export const getScheduledDate = (): string => {
  const today = new Date();

  /**
   * We'll schedule tweets from `SCHEDULE_FROM`.
   */
  let scheduledDate = dateFns.addDays(today, SCHEDULE_FROM);

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
   * 10h UTC = 7h America/Sao_Paulo
   * 14h UTC = 11h America/Sao_Paulo
   */
  const setRandomHour = getRandomInt({ min: 10, max: 14 });
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

const formatTweetResponse = (tweetResponse: any) => {
  return {
    ...tweetResponse,
    scheduledAt: tweetResponse?.scheduled_at,
    completedAt: tweetResponse?.completed_at,
    idStr: tweetResponse?.id_str,
  };
};

type Body = {
  request: any;
  data: {
    text: string;
    scheduled_at: string;
  };
};

export const scheduleTweet = async ({ tweet }: { tweet: string }) => {
  const scheduledAt = getScheduledDate();

  const params = new URLSearchParams({
    scheduled_at: scheduledAt,
    as_user_id: process.env.TWITTER_USER_ID,
    text: tweet,
    nullcast: false,
  } as any);

  const { request, data } = await new Promise<Body>((resolve, reject) => {
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

  return { request, data: formatTweetResponse(data) };
};

export const updateTweet = async ({
  scheduledTweetId,
  text,
}: {
  scheduledTweetId: string;
  text: string;
}): Promise<any> => {
  const params = new URLSearchParams({
    text,
    nullcast: false,
  } as any);

  const { request, data } = await new Promise<Body>((resolve, reject) => {
    twitter.put(
      `accounts/:account_id/scheduled_tweets/:scheduled_tweet_id?${params.toString()}`,
      {
        account_id: process.env.TWITTER_ACCOUNT_ID,
        scheduled_tweet_id: scheduledTweetId,
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

  return { request, data: formatTweetResponse(data) };
};

export const deleteScheduledTweet = async ({
  scheduledTweetId,
}: {
  scheduledTweetId: string;
}) => {
  const { request, data } = await new Promise<any>((resolve, reject) => {
    twitter.delete(
      `accounts/:account_id/scheduled_tweets/:scheduled_tweet_id`,
      {
        account_id: process.env.TWITTER_ACCOUNT_ID,
        scheduled_tweet_id: scheduledTweetId,
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

  return { request, data: formatTweetResponse(data) };
};

export const getAllScheduledTweets = async ({
  cursor,
}: {
  cursor?: string;
}) => {
  const params = new URLSearchParams({
    count: 200,
    user_id: process.env.TWITTER_USER_ID,
  } as any);

  if (cursor) {
    params.set('cursor', cursor);
  }

  const {
    request,
    data,
    next_cursor: nextCursor,
  } = await new Promise<any>((resolve, reject) => {
    twitter.get(
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

  return { nextCursor, request, data: data.map((d) => formatTweetResponse(d)) };
};
