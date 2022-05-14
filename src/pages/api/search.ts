import { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../../lib/files';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts();
  res.status(200).json({ length: posts.length });
};

export default search;
