import { NextApiRequest, NextApiResponse } from 'next';

import { saveNewsletterItems } from '../../src/lib/newsletter';

import { hofs } from '../hofs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      await saveNewsletterItems(JSON.parse(req.body) || {});
      res.status(200).json({});
      return;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  res.status(403).end();
};

export default hofs(handler);