/**
 * https://www.getrevue.co/api#get-/v2/lists
 */
import urlMetadata from 'url-metadata';

const BASE_URL = 'https://www.getrevue.co/api';

const getCurrentIssue = async () => {
  const response = await fetch(`${BASE_URL}/v2/issues/current`, {
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
    },
  });

  const data = await response.json();

  data.createdAt = data.created_at;

  return data[0] as {
    id: number;
    title: string;
    url: string;
    description: string;
    subject: string;
    scheduled: string;
    active: boolean;
    createdAt: string;
  };
};

export const addItemToIssue = async ({ url }: { url: string }) => {
  const { id } = await getCurrentIssue();

  const { title, description, image } = await urlMetadata(url, {});

  const formData = new URLSearchParams({
    issue_id: id.toString(),
    title,
    url,
    description,
    thumb_url: image,
    default_image: image,
  });

  const response = await fetch(`${BASE_URL}/v2/issues/${id}/items`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  const data = await response.json();

  return data as {
    title: string;
    created_at: string;
    url: string;
    description: string;
    order: string;
    title_display: string;
    short_url: string;
    thumb_url: string;
    default_image: string;
    hash_id: string;
  };
};
