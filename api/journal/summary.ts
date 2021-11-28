import { NextApiRequest, NextApiResponse } from 'next';

import { getJournalsSummary } from '../../lib/files';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const summary = await getJournalsSummary(req.query.date as string);
  res.status(200).json({ summary });
};

export default handler;
