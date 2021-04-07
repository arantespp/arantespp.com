import { Box, Flex, Heading, Input, Link, Text } from 'theme-ui';

const Digest = () => (
  <Flex
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 6,
      width: '100%',
    }}
  >
    <Heading as="h2" sx={{ color: 'primary' }}>
      Subscribe to my weekly digest
    </Heading>
    <Box sx={{ maxWidth: 450 }}>
      <form
        action="https://www.getrevue.co/profile/arantespp/add_subscriber"
        method="post"
        id="revue-form"
        name="revue-form"
        target="_blank"
        style={{ width: '100%' }}
      >
        <Flex sx={{ marginTop: 4, marginBottom: 2 }}>
          <Input
            id="member_email"
            placeholder="Your email address..."
            name="member[email]"
            type="email"
            sx={{ flex: 1 }}
          />
          <Input
            type="submit"
            value="Subscribe"
            name="member[subscribe]"
            id="member_submit"
            sx={{
              flex: '0 0 150px',
              backgroundColor: 'primary',
              color: 'white',
            }}
          />
        </Flex>
        <Text sx={{ fontSize: 1, color: 'gray' }}>
          By subscribing, you agree with Revue’s{' '}
          <Link target="_blank" href="https://www.getrevue.co/terms">
            Terms
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="https://www.getrevue.co/privacy">
            Privacy Policy
          </Link>
        </Text>
      </form>
    </Box>
  </Flex>
);

export default Digest;
