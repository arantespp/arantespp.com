import { NextApiRequest, NextApiResponse } from 'next';
import { requireApiKey } from '../../../../lib/hofs/requireApiKey';
import fetch from 'isomorphic-unfetch';

type MonicaContactsResponse = {
  data: {
    id: string;
    first_name: string;
    complete_name: string;
    hash_id: string;
  }[];
};

type MonicaActivitiesResponse = {
  data: {
    id: string;
    happened_at: string;
  }[];
};

const headers = {
  Authorization: `Bearer ${process.env.MONICA_API_KEY}`,
  'Content-Type': 'application/json',
};

const getContactActivities = async ({ contactId }: { contactId: string }) => {
  const endpoint = `${process.env.MONICA_ENDPOINT}/api/contacts/${contactId}/activities`;

  const { data } = await fetch(endpoint, {
    headers,
  }).then<MonicaActivitiesResponse>((res) => res.json());

  return {
    activities: data.map((activity) => ({
      id: activity.id,
      happenedAt: activity.happened_at,
    })),
  };
};

const checkIfActivityExistsInTheSameDate = async ({
  contactId,
  date,
}: {
  contactId: string;
  date: string;
}) => {
  const { activities } = await getContactActivities({ contactId });

  const activityInTheSameDate = activities.find(
    (activity) => activity.happenedAt === date,
  );

  return activityInTheSameDate;
};

const JOURNAL_ACTIVITY_TYPE_ID = 18;

const insertActivity = async ({
  contactId,
  date,
  content,
}: {
  contactId: string;
  date: string;
  content: string;
}) => {
  const activityExists = await checkIfActivityExistsInTheSameDate({
    contactId,
    date,
  });

  const description = `[Read journal](https://arantespp.com/journal/${date})`;

  const payload = {
    activity_type_id: JOURNAL_ACTIVITY_TYPE_ID,
    summary: `${date}`,
    description,
    happened_at: date,
    contacts: [contactId],
  };

  if (activityExists) {
    /**
     * Update activity
     * https://www.monicahq.com/api/activities#update-an-activity
     */
    await fetch(
      `${process.env.MONICA_ENDPOINT}/api/activities/${activityExists.id}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      },
    ).then((res) => res.json());

    return;
  }

  /**
   * Create activity
   * https://www.monicahq.com/api/activities#create-an-activity
   */
  await fetch(`${process.env.MONICA_ENDPOINT}/api/activities`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
};

const monicaContactsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    const { query } = req.query;

    const endpoint = `${process.env.MONICA_ENDPOINT}/api/contacts?query=${query}`;

    const response = await fetch(endpoint, {
      headers,
    });

    const { data }: MonicaContactsResponse = await response.json();

    const contacts = data
      .map(({ first_name, complete_name, hash_id, id }) => ({
        id,
        firstName: first_name,
        completeName: complete_name,
        hashId: hash_id,
        url: `${process.env.MONICA_ENDPOINT}/people/${hash_id}`,
      }))
      .sort((a, b) => a.completeName.localeCompare(b.completeName));

    return res.status(200).json({ contacts });
  }

  if (req.method === 'POST') {
    const {
      content,
      date,
      contact,
    }: {
      content: string;
      date: string;
      contact: { id: string; hashId: string };
    } = JSON.parse(req.body);

    const paragraphContainsContactText =
      content
        .split('\n')
        .find((paragraph) => paragraph.includes(contact.hashId)) || '';

    await insertActivity({
      content: paragraphContainsContactText,
      date,
      contactId: contact.id,
    });

    return res.status(200).end();
  }

  res.status(403).end();
};

export default requireApiKey(monicaContactsHandler);
