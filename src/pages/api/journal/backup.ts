import { NextApiRequest, NextApiResponse } from 'next';
import { getBackupJournal } from '../../../../lib/journal';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const journalBackupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const backup = await getBackupJournal({ date: req.query.date as string });
  res.status(200).json({ backup });
};

export default requireApiKey(journalBackupHandler);
