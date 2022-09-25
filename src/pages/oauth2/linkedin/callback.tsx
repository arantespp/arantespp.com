import { NextSeo } from 'next-seo';
import { Text } from 'theme-ui';
import { useHandleLinkedInCallback } from '../../../hooks/useLinkedInToken';
import Loading from '../../../components/Loading';

const Oauth2LinkedinCallbackPage = () => {
  const { isLoading, isSuccess } = useHandleLinkedInCallback();

  return (
    <>
      <NextSeo noindex nofollow />
      {isLoading && <Loading />}
      {isSuccess && <Text>Success!</Text>}
    </>
  );
};

export default Oauth2LinkedinCallbackPage;
