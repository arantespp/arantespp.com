import { NextApiRequest, NextApiResponse } from 'next';

import { getJournal, saveJournal } from '../../src/lib/files';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const journal = await getJournal(req.query.date as string);
    res.status(200).json({ journal });
  }

  if (req.method === 'PUT') {
    if (process.env.NODE_ENV !== 'development') {
      res.status(403).send('Only works on development environment.');
      return;
    }

    try {
      await saveJournal(JSON.parse(req.body));
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};

export default handler;
