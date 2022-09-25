import * as React from 'react';
import { Flex, Input, Text } from 'theme-ui';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../hooks/useApiKey';

const ApiKey = () => {
  const { apiKey, setApiKey } = useApiKey();

  return (
    <>
      <NextSeo noindex nofollow title="API key" />
      <Flex sx={{ flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Text>API Key: {apiKey}</Text>
        <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </Flex>
    </>
  );
};

export default ApiKey;
