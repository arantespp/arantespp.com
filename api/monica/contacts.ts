import { NextApiRequest, NextApiResponse } from 'next';

import { requireApiKey } from '../../lib/hofs/requireApiKey';

type MonicaContactsResponse = {
  data: {
    first_name: string;
    complete_name: string;
    hash_id: string;
  }[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { query } = req.query;

    const endpoint = `${process.env.MONICA_ENDPOINT}/api/contacts?query=${query}`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.MONICA_API_KEY}`,
        ContentType: 'application/json',
      },
    });

    const { data }: MonicaContactsResponse = await response.json();

    const contacts = data.map(({ first_name, complete_name, hash_id }) => ({
      firstName: first_name,
      completeName: complete_name,
      url: `${process.env.MONICA_ENDPOINT}/people/${hash_id}`,
    }));

    res.status(200).json({ contacts });
  }

  res.status(403).end();
};

export default requireApiKey(handler);
