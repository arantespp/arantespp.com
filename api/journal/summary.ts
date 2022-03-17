import { NextApiRequest, NextApiResponse } from 'next';

import { getJournalsSummary } from '../../lib/journal';

import { requireApiKey } from '../../lib/hofs/requireApiKey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const summary = await getJournalsSummary({ date: req.query.date as string });
  res.status(200).json({ summary });
};

export default requireApiKey(handler);
