import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthorizationUrl } from '../../../../lib/linkedIn';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const linkedinAuthorizationUrlHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    try {
      const authorizationUrl = await getAuthorizationUrl();
      return res.status(200).json({ authorizationUrl });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default requireApiKey(linkedinAuthorizationUrlHandler);
