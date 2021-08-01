import { Box, Button, Flex, Input, Text, Themed } from 'theme-ui';

import { getNextNewsletterDate } from '../lib/getNextNewsletterDate';

import Heading from './Heading';
import Link from './Link';
import Tag from './Tag';

const Newsletter = () => (
  <Box>
    <Heading level={2}>Newsletter</Heading>
    <Themed.p>
      Every {getNextNewsletterDate({ format: 'EEEE' })}, I publish a newsletter
      with <Link href="/digest">the posts I created in the last week</Link>. If
      you want to follow my latest posts about <Tag tag="startup" />,{' '}
      <Tag tag="mental-models" />, <Tag tag="cryptocurrencies" />, and more,
      please, subscribe to my newsletter or check my{' '}
      <Link href="https://www.getrevue.co/profile/arantespp">
        Revue&apos;s profile
      </Link>
      .
    </Themed.p>
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
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
            <Link href="https://www.getrevue.co/terms">Terms</Link> and{' '}
            <Link href="https://www.getrevue.co/privacy">Privacy Policy</Link>
          </Text>
        </form>
      </Box>
    </Flex>
  </Box>
);

export default Newsletter;
