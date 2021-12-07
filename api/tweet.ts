import { NextApiRequest, NextApiResponse } from 'next';

import { requireApiKey } from './hofs/requireApiKey';

import { scheduleTweet } from '../lib/scheduleTweet';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { tweet } = JSON.parse(req.body) as any;
    const { data } = await scheduleTweet({ tweet });
    res.status(200).json({ tweet, ...data, scheduledAt: data.scheduled_at });
  }

  res.status(403).end();
};

export default requireApiKey(handler);
