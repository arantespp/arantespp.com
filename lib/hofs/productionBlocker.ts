import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Only GET method can be used in production. Other methods are blocked because
 * they commit data to repository.
 */
export const productionBlocker = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    /**
     * If the request is not a GET, is PUT, POST or DELETE.
     */
    if (req.method !== 'GET') {
      /**
       * If `LOCAL` is true AND if `NODE_ENV` is not `development`.
       */
      if (
        !JSON.parse(process.env.LOCAL || 'false') &&
        process.env.NODE_ENV !== 'development'
      ) {
        return res
          .status(403)
          .json({ error: 'Only works on development environment.' });
      }
    }

    return handler(req, res);
  };
};
