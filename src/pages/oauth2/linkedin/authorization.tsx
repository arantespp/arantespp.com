import * as React from 'react';
import { useApiKey } from '../../../hooks/useApiKey';
import { useQuery } from 'react-query';
import Loading from '../../../components/Loading';

const Oauth2LinkedinAuthorizationPage = () => {
  const { apiKey } = useApiKey();

  const { data } = useQuery(
    [`/api/linkedin/authorizationUrl`, apiKey],
    async ({ queryKey }) => {
      return fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then((r): Promise<{ authorizationUrl: string }> => r.json());
    },
    { enabled: Boolean(apiKey) },
  );

  React.useEffect(() => {
    if (data?.authorizationUrl) {
      window.open(data.authorizationUrl, '_self');
    }
  }, [data?.authorizationUrl]);

  return <Loading />;
};

export default Oauth2LinkedinAuthorizationPage;
