import * as React from 'react';
import { Flex, Spinner } from 'theme-ui';

const Loading = ({ delay = 0 }: { delay?: number }) => {
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
      <Spinner />
    </Flex>
  );
};

export default Loading;
