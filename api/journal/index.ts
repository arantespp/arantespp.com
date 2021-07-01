import { NextApiRequest, NextApiResponse } from 'next';

import { getJournals } from '../../src/lib/files';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const journals = await getJournals(Number(req.query.page));
  res.status(200).json({ journals });
};

export default handler;
