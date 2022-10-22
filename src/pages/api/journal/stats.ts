import { NextApiRequest, NextApiResponse } from 'next';
import { getStats } from '../../../../lib/journal';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const journalStatsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const stats = await getStats();
    res.status(200).json(stats);
  }
};

export default requireApiKey(journalStatsHandler);
