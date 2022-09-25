// const STATE = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6';

const STATE = 'some-random-state';

/**
 * https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token
 */
export const getAuthorizationUrl = async () => {
  const URL = 'https://www.linkedin.com/oauth/v2/authorization';

  const params = {
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID || '',
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI || '',
    state: STATE,
    scope: 'r_liteprofile r_emailaddress w_member_social',
  };

  const url = `${URL}?${new URLSearchParams(params)}`;

  return url;
};

/**
 * https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token
 */
export const getAccessToken = async ({
  code,
  state,
}: {
  code: string;
  state: string;
}) => {
  if (state !== STATE) {
    throw new Error('Invalid state');
  }

  const URL = 'https://www.linkedin.com/oauth/v2/accessToken/';

  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI || '',
    client_id: process.env.LINKEDIN_CLIENT_ID || '',
    client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
  };

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams(params),
  });

  const data = await response.json();

  if (data?.error) {
    throw new Error(`${data.error}: ${data.error_description}`);
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
};

/**
 * https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin#retrieving-member-profiles
 */
type Profile = {
  id: string;
};

export const retrieveLinkedInProfile = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const URL = 'https://api.linkedin.com/v2/me';

  const params = {
    projection:
      '(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
  };

  const response = await fetch(`${URL}?${new URLSearchParams(params)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data as Profile;
};

/**
 * https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin%2Fconsumer%2Fcontext#creating-a-share-on-linkedin
 */
export const sharePost = async ({
  accessToken,
  text,
  blogPostUrl,
}: {
  accessToken: string;
  text: string;
  blogPostUrl: string;
}) => {
  const URL = 'https://api.linkedin.com/v2/ugcPosts';

  const { id: authorId } = await retrieveLinkedInProfile({ accessToken });

  const params = {
    author: `urn:li:person:${authorId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text,
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            originalUrl: blogPostUrl,
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data as { id: string };
};
