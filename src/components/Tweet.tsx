import Head from 'next/head';
import * as React from 'react';
import { Flex } from 'theme-ui';

const tweetIdentifier = 'Tweet: ';

const Tweet = ({ children }: { children: React.ReactNode[] }) => {
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
        sx={{ justifyContent: 'center', marginBottom: 3 }}
        dangerouslySetInnerHTML={{
          __html: children.join('').replace(tweetIdentifier, ''),
        }}
      />
    </>
  );
};

Tweet.isTweet = (children: React.ReactNode) =>
  Array.isArray(children) && children.join('').startsWith(tweetIdentifier);

export default Tweet;
