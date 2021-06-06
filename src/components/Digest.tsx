import { Box, Button, Flex, Heading, Input, Link, Text } from 'theme-ui';

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
    <Heading as="h2" sx={{ textAlign: 'center' }}>
      <Link
        href="https://www.getrevue.co/profile/arantespp"
        sx={{
          color: 'primary',
          '&:hover': {
            color: 'link',
          },
        }}
      >
        Subscribe to my weekly digest
      </Link>
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
        <Flex
          sx={{
            marginTop: 4,
            marginBottom: 2,
            flexDirection: ['column', 'row'],
            alignItems: [null, 'baseline'],
          }}
        >
          <Box sx={{ flex: 1, padding: 0 }}>
            <Input
              id="member_email"
              placeholder="Your email address..."
              name="member[email]"
              type="email"
            />
          </Box>
          <Button
            type="submit"
            name="member[subscribe]"
            id="member_submit"
            sx={{
              maxHeight: '44px',
              flexBasis: [150],
              backgroundColor: 'primary',
              color: 'white',
              marginTop: [2, 0],
              marginLeft: [0, 2],
            }}
          >
            Subscribe
          </Button>
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
