import { Box, Heading } from 'theme-ui';

const NotFound = () => {
  return (
    <Box sx={{ margin: 4 }}>
      <Heading as="h2" sx={{ textAlign: 'center' }}>
        Page Not Found ;(
      </Heading>
    </Box>
  );
};

export default NotFound;
