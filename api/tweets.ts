import { NextApiRequest, NextApiResponse } from 'next';

import { requireApiKey } from './hofs/requireApiKey';

import { getAllScheduledTweets } from '../lib/scheduleTweet';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data, nextCursor } = await getAllScheduledTweets({
      cursor: req.query?.cursor as string | undefined,
    });
    res.status(200).json({ tweets: data, nextCursor });
    return;
  }

  res.status(403).end();
};

export default requireApiKey(handler);
