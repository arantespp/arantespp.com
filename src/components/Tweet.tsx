import * as React from 'react';
import { Box, useThemeUI } from 'theme-ui';
import dynamic from 'next/dynamic';

const TweetWidget = dynamic(() =>
  import('react-twitter-widgets').then((mod) => mod.Tweet),
);

const getTweetStatus = (href: string) => {
  const { pathname } = new URL(href);
  const [, , , status] = pathname.split('/');
  return status;
};

export const isTweet = (href: string) => {
  return href.startsWith('https://twitter.com/') && getTweetStatus(href);
};

const Tweet = ({ href }: { href: string }) => {
  const { colorMode } = useThemeUI();

  if (!isTweet(href)) {
    return null;
  }

  const status = getTweetStatus(href);

  return (
    <Box data-testid="embed-tweet" sx={{ marginY: 4 }}>
      <TweetWidget
        tweetId={status}
        options={{ align: 'center', theme: colorMode }}
      />
    </Box>
  );
};

Tweet.isTweet = isTweet;

export default Tweet;
