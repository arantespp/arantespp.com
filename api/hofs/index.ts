import { NextApiRequest, NextApiResponse } from 'next';

import { productionBlocker } from './productionBlocker';

export const hofs = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return productionBlocker(handler);
};
