import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteScheduledTweet,
  scheduleTweet,
  updateTweet,
} from '../lib/scheduleTweet';
import { requireApiKey } from '../lib/hofs/requireApiKey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tweet, numberOfTweets } = JSON.parse(req.body) as any;
    const { data } = await scheduleTweet({ tweet, numberOfTweets });
    res.status(200).json({ tweet, ...data });
    return;
  }

  if (req.method === 'PUT') {
    const { text, scheduledTweetId } = JSON.parse(req.body) as any;
    const { data } = await updateTweet({ text, scheduledTweetId });
    res.status(200).json(data);
    return;
  }

  if (req.method === 'DELETE') {
    const { scheduledTweetId } = JSON.parse(req.body) as any;
    const { data } = await deleteScheduledTweet({ scheduledTweetId });
    res.status(200).json(data);
    return;
  }

  res.status(403).end();
};

export default requireApiKey(handler);
