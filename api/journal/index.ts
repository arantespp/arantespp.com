import { NextApiRequest, NextApiResponse } from 'next';

import { getJournal, saveJournal } from '../../lib/files';

import { hofs } from '../hofs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const journal = await getJournal(req.query.date as string);
    res.status(200).json({ journal });
  }

  if (req.method === 'PUT') {
    try {
      await saveJournal(JSON.parse(req.body));
      res.status(200).json({});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};

export default hofs(handler);
