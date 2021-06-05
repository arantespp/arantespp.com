/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import HTMLHeaders from '../components/HTMLHeaders';
import Layout from '../components/Layout';

import { socialMedias } from '../lib/socialMedias';

import { theme } from '../theme';

import '../katex.css';

const title = "Pedro Arantes' Digital Garden";

const description =
  "I'v created this website to make notes about the subjects I'm learning.";

/**
 * Twitter meta tags:
 *
 * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
 * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
 */
const DefaultHeaders = () => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        key="viewport"
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta key="author" name="author" content="Pedro Arantes" />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
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
      <meta key="og:url" property="og:url" content="https://arantespp.com" />
      <meta key="og:type" property="og:type" content="website" />
      <meta
        key="og:image"
        property="og:image"
        content="https://arantespp.com/me.jpg"
      />
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
    </Head>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <DefaultHeaders />
      <HTMLHeaders title={title} description={description} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
