import { NextApiRequest, NextApiResponse } from 'next';

import { getJournalSummary } from '../../src/lib/files';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const summary = await getJournalSummary(req.query.date as string);
  res.status(200).json({ summary });
};

export default handler;
