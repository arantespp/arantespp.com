import * as React from 'react';
import { Flex } from 'theme-ui';

const getTweetStatus = (href: string) => {
  const { pathname } = new URL(href);
  const [, , , status] = pathname.split('/');
  return status;
};

const isTweet = (href: string) => {
  return href.startsWith('https://twitter.com/') && getTweetStatus(href);
};

const Tweet = ({ href }: { href: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const status = getTweetStatus(href);

    const createTweet = (window as any)?.twttr?.widgets?.createTweet;

    if (status && ref.current && createTweet) {
      /**
       * Tweet already loaded.
       */
      if (!ref.current.innerHTML) {
        createTweet(status, ref.current);
      }
    }
  }, [href]);

  if (!isTweet(href)) {
    return null;
  }

  return (
    <Flex
      data-testid="embed-tweet"
      ref={ref}
      sx={{ justifyContent: 'center', marginBottom: 3 }}
    />
  );
};

Tweet.isTweet = isTweet;

export default Tweet;
