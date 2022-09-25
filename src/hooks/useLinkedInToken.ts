import * as React from 'react';
import { useApiKey } from './useApiKey';
import { useMutation } from 'react-query';
import { useNextQueryParams } from './useNextQueryParams';
import { useRouter } from 'next/router';

type LinkedInToken = {
  accessToken: string;
  expiresIn: number;
};

const LOCAL_STORAGE_KEY = 'linkedin-token';

export const useHandleLinkedInCallback = () => {
  const { apiKey } = useApiKey();

  const params = useNextQueryParams();

  const { mutate: getToken, ...restMutation } = useMutation(
    () =>
      fetch('/api/linkedin/accessToken', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          code: params.code,
          state: params.state,
        }),
      }).then((r): Promise<{ accessKey: string; expiresIn: number }> => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }

        return r.json();
      }),
    {
      onSuccess: (data) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      },
    },
  );

  React.useEffect(() => {
    if (params.code && params.state && apiKey) {
      getToken();
    }
  }, [getToken, params.code, params.state, apiKey]);

  return restMutation;
};

export const useLinkedInToken = () => {
  const { push } = useRouter();

  const [token, setToken] = React.useState<LinkedInToken | null>(null);

  React.useEffect(() => {
    const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localStorageToken) {
      if (!token) {
        setToken(JSON.parse(localStorageToken));
      }
    } else {
      push('/oauth2/linkedin/authorization');
    }
  }, [push, token]);

  return token;
};
