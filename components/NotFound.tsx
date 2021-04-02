import { Flex, Text } from 'theme-ui';

const NotFound = () => {
  return (
    <Flex sx={{ justifyContent: 'center', margin: 4 }}>
      <Text sx={{ fontSize: 5, fontWeight: 'bold' }}>
        Ops, page not found 😢
      </Text>
    </Flex>
  );
};

export default NotFound;
