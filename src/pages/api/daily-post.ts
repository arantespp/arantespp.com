import { NextApiRequest, NextApiResponse } from 'next';
import { handleDailyPost } from '../../../lib/dailyPost';
import { requireApiKey } from '../../../lib/hofs/requireApiKey';

const dailyPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const response = await handleDailyPost(JSON.parse(req.body));
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default requireApiKey(dailyPostHandler);
