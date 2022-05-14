import { NextApiRequest, NextApiResponse } from 'next';
import { getNewsletterData } from '../../../../lib/newsletter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json(await getNewsletterData());
    return;
  }

  res.status(403).end();
};

export default handler;
