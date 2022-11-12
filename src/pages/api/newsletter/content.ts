import { NextApiRequest, NextApiResponse } from 'next';
import { getNewsletterContent } from '../../../../lib/newsletter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const newsletterContent = await getNewsletterContent();
      return res.status(200).json(newsletterContent);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(403).end();
};

export default handler;
