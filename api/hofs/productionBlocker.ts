import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Methods that are not GET can't be used in production.
 */
export const productionBlocker = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'GET') {
      if (process.env.NODE_ENV !== 'development') {
        return res
          .status(403)
          .json({ error: 'Only works on development environment.' });
      }
    }

    return handler(req, res);
  };
};
