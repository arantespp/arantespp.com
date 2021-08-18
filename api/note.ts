import { NextApiRequest, NextApiResponse } from 'next';

import { saveNote } from '../src/lib/saveNote';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== 'development') {
    res.status(403).send('Only works on development environment.');
    return;
  }

  if (req.method !== 'PUT') {
    res.status(403).end();
    return;
  }

  try {
    const response = await saveNote(JSON.parse(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
