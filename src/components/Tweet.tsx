import Head from 'next/head';
import * as React from 'react';
import { Flex } from 'theme-ui';

const tweetIdentifier = /^!\[(twitter|tweet)\]\((.*?)\)$/;

const isTweet = (children: React.ReactNode) => {
  return Array.isArray(children) && tweetIdentifier.test(children.join(''));
};

const Tweet = ({ children }: { children: React.ReactNode[] }) => {
  if (!isTweet(children)) {
    return null;
  }

  const [, , html] = tweetIdentifier.exec(children.join('')) || [];

  return (
    <>
      <Head>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </Head>
      <Flex
        data-testid="embed-tweet"
        sx={{ justifyContent: 'center', marginBottom: 3 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

Tweet.isTweet = isTweet;

export default Tweet;
