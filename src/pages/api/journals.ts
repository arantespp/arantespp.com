import { NextApiRequest, NextApiResponse } from 'next';
import { getJournals } from '../../../lib/journal';
import { requireApiKey } from '../../../lib/hofs/requireApiKey';

const journalsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const journals = await getJournals();
    res.status(200).json(journals);
  }
};

export default requireApiKey(journalsHandler);
