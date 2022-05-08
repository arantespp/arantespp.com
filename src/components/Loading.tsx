import * as React from 'react';
import { Flex, Spinner } from 'theme-ui';

export const Loading = ({ delay = 100 }: { delay?: number }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, setIsLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Spinner aria-busy="true" aria-live="polite" role="status" />
    </Flex>
  );
};

export default Loading;
