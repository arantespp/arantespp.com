import * as React from 'react';
import { Tweet as TweetWidget } from 'react-twitter-widgets';
import { Box } from 'theme-ui';

const getTweetStatus = (href: string) => {
  const { pathname } = new URL(href);
  const [, , , status] = pathname.split('/');
  return status;
};

export const isTweet = (href: string) => {
  return href.startsWith('https://twitter.com/') && getTweetStatus(href);
};

const Tweet = ({ href }: { href: string }) => {
  if (!isTweet(href)) {
    return null;
  }

  const status = getTweetStatus(href);

  return (
    <Box data-testid="embed-tweet" sx={{ marginY: 4 }}>
      <TweetWidget tweetId={status} options={{ align: 'center' }} />
    </Box>
  );
};

Tweet.isTweet = isTweet;

export default Tweet;
