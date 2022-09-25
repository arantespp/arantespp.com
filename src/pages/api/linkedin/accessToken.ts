import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../../../../lib/linkedIn';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';

const linkedinAccessTokenHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    const { code, state } = JSON.parse(req.body);

    try {
      const response = await getAccessToken({ code, state });
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default requireApiKey(linkedinAccessTokenHandler);
