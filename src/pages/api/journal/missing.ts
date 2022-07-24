import { NextApiRequest, NextApiResponse } from 'next';
import { getMissingDays } from '../../../../lib/journal';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const journalMissingHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const missing = await getMissingDays();
    res.status(200).json(missing);
  }
};

export default requireApiKey(journalMissingHandler);
