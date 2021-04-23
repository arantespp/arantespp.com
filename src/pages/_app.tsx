/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import Layout from '../components/Layout';

import { socialMedias } from '../lib/socialMedias';

import { theme } from '../theme';

const title = "Pedro Arantes' Digital Garden";

const App = ({ Component, pageProps }: AppProps) => {
  const description =
    "I'v created this website to make notes about the subjects I'm learning.";

  /**
   * Twitter meta tags:
   *
   * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
   * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
   */
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="Description" content={description} />
        <meta property="og:url" key="og:url" content="https://arantespp.com" />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:title" key="og:title" content={title} />
        <meta
          property="og:description"
          key="og:description"
          content={description}
        />
        <meta property="og:image" key="og:image" content="/me.jpg" />
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:site"
          name="twitter:site"
          content={socialMedias.Twitter.username}
        />
        <meta
          key="twitter:twitter:creator"
          name="twitter:twitter:creator"
          content={socialMedias.Twitter.username}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
