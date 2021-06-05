import { NextApiRequest, NextApiResponse } from 'next';

import { getFlashcard } from '../src/lib/getFlashcard';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const flashcard = await getFlashcard();
  res.status(200).json({ flashcard });
};

export default handler;
