import { Text } from 'theme-ui';

const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) {
    return null;
  }

  return <Text>{error}</Text>;
};

export default ErrorMessage;
