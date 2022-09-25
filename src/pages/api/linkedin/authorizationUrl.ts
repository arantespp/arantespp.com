import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthorizationUrl } from '../../../../lib/linkedIn';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const linkedinAuthorizationUrlHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const authorizationUrl = await getAuthorizationUrl();
    res.status(200).json({ authorizationUrl });
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default requireApiKey(linkedinAuthorizationUrlHandler);
