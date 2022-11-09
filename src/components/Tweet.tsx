import * as React from 'react';
import { Box, Flex, Text, useThemeUI } from 'theme-ui';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const getTweetStatus = (href: string) => {
  const { pathname } = new URL(href);
  const [, , , status] = pathname.split('/');
  return status;
};

export const isTweet = (href: string) => {
  return href.startsWith('https://twitter.com/') && getTweetStatus(href);
};

export const Tweet = React.memo(({ href }: { href: string }) => {
  const { colorMode } = useThemeUI();

  if (!isTweet(href)) {
    return null;
  }

  const status = getTweetStatus(href);

  return (
    <Box data-testid="embed-tweet" sx={{ marginY: 4, minHeight: 300 }}>
      <TwitterTweetEmbed
        tweetId={status}
        options={{ align: 'center', theme: colorMode }}
        placeholder={
          <Flex>
            <Text sx={{ textAlign: 'center', width: '100%' }}>
              Loading tweet...
            </Text>
          </Flex>
        }
      />
    </Box>
  );
});
