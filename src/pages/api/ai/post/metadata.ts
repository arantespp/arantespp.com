import { NextApiRequest, NextApiResponse } from 'next';
import { generatePostMetadata } from '../../../../../lib/ai';
import { productionBlocker } from '../../../../../lib/hofs/productionBlocker';

const aiPostMetadataHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const content = req.query.content as string;
    const metadata = await generatePostMetadata({ content });
    return res.status(200).json(metadata);
  }

  res.status(403).end();
};

export default productionBlocker(aiPostMetadataHandler);
