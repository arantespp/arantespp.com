import { NextApiRequest, NextApiResponse } from 'next';
import { getDraft, getPost, savePost } from '../../../../lib/files';
import { productionBlocker } from '../../../../lib/hofs/productionBlocker';

const putPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await savePost(JSON.parse(req.body));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  return;
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const args = req.query as any;
    res.status(200).json((await getPost(args)) || (await getDraft(args)));

    return;
  }

  if (req.method === 'PUT') {
    await productionBlocker(putPostHandler)(req, res);

    return;
  }

  res.status(403).end();
};

export default postHandler;
