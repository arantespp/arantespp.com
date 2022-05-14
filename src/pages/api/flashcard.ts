import { NextApiRequest, NextApiResponse } from 'next';
import { getFlashcard } from '../../../lib/getFlashcard';

const flashcardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const flashcard = await getFlashcard();
  res.status(200).json({ flashcard });
};

export default flashcardHandler;
