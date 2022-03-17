import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Methods that are not GET can't be used in production.
 */
export const requireApiKey = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    /**
     * If the request is not a GET, is PUT, POST or DELETE.
     */
    if (req.headers?.['x-api-key'] !== process.env.API_KEY) {
      return res.status(422).json({ error: 'Invalid API key.' });
    }

    return handler(req, res);
  };
};
