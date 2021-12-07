import * as React from 'react';
import { Flex, Input, Text } from 'theme-ui';

import { useApiKey } from '../hooks/useApiKey';

const ApiKey = () => {
  const { apiKey, setApiKey } = useApiKey();

  return (
    <Flex sx={{ flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Text>API Key: {apiKey}</Text>
      <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
    </Flex>
  );
};

export default ApiKey;
