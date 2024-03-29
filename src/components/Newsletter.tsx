import { Box, Button, Flex, Input, Text } from 'theme-ui';
import Link from './Link';
import Tag from './Tag';

const Newsletter = () => (
  <Box sx={{ marginY: 0 }}>
    <Box sx={{ marginBottom: 3 }}>
      <Text sx={{ fontSize: 4, fontFamily: 'heading', fontWeight: 'heading' }}>
        Newsletter
      </Text>
    </Box>

    <Text>
      On Tuesday (not weekly), I publish my most recent readings and thoughts.
      Subscribe to my newsletter if you want to follow posts about{' '}
      <Tag tag="startups" />, <Tag tag="product-development" />
      , <Tag tag="mental-models" />, and <Link href="/tags">more</Link>.
    </Text>

    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <form
          action="https://www.getrevue.co/profile/arantespp/add_subscriber"
          method="post"
          id="revue-form"
          name="revue-form"
          target="_blank"
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
          <Text
            as="p"
            sx={{
              fontSize: 0,
              color: 'gray',
              textAlign: 'center',
            }}
          >
            By subscribing, you agree with Revue’s{' '}
            <Link href="https://www.getrevue.co/terms">Terms</Link> and{' '}
            <Link href="https://www.getrevue.co/privacy">Privacy Policy</Link>.
          </Text>
        </form>
      </Box>
    </Flex>
  </Box>
);

export default Newsletter;
