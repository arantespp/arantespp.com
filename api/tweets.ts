import { NextApiRequest, NextApiResponse } from 'next';

import { requireApiKey } from './hofs/requireApiKey';

import { getAllScheduledTweets } from '../lib/scheduleTweet';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data } = await getAllScheduledTweets();
    res.status(200).json(data);
  }

  res.status(403).end();
};

export default requireApiKey(handler);
