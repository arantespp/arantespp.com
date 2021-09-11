import { NextApiRequest, NextApiResponse } from 'next';

import { getPartialPost, getDraft } from '../src/lib/files';
import { savePost } from '../src/lib/savePost';

import { hofs } from './hofs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const args = req.query as any;
    res.status(200).json(getPartialPost(args) || getDraft(args));
    return;
  }

  if (req.method === 'PUT') {
    try {
      const response = await savePost(JSON.parse(req.body));
      res.status(200).json(response);
      return;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  res.status(403).end();
};

export default hofs(handler);
