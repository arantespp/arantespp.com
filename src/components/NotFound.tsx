import { Flex, Text } from 'theme-ui';

const NotFound = () => (
  <Flex sx={{ justifyContent: 'center', margin: 4 }}>
    <Text sx={{ fontSize: 5, fontWeight: 'bold', textAlign: 'center' }}>
      Ops, page not found 😢
    </Text>
  </Flex>
);

export default NotFound;
