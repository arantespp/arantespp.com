import { NextApiRequest, NextApiResponse } from 'next';

import { requireApiKey } from './hofs/requireApiKey';

import { scheduleTweet, deleteScheduledTweet } from '../lib/scheduleTweet';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tweet, numberOfTweets } = JSON.parse(req.body) as any;
    const { data } = await scheduleTweet({ tweet, numberOfTweets });
    res.status(200).json({ tweet, ...data, scheduledAt: data.scheduled_at });
  }

  if (req.method === 'DELETE') {
    const { scheduledTweetId } = JSON.parse(req.body) as any;
    const { data } = await deleteScheduledTweet({ scheduledTweetId });
    res.status(200).json(data);
  }

  res.status(403).end();
};

export default requireApiKey(handler);
