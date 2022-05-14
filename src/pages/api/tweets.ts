import { NextApiRequest, NextApiResponse } from 'next';
import { getAllScheduledTweets } from '../../../lib/scheduleTweet';
import { requireApiKey } from '../../../lib/hofs/requireApiKey';

const tweetsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data, nextCursor } = await getAllScheduledTweets({
      cursor: req.query?.cursor as string | undefined,
    });
    res.status(200).json({ tweets: data, nextCursor });
    return;
  }

  res.status(403).end();
};

export default requireApiKey(tweetsHandler);
