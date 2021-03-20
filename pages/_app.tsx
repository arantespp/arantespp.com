import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import Layout from '../components/Layout';

import { theme } from '../theme';

const title = "Pedro Arantes' Digital Garden";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>{title}</title>
        <meta property="og:url" key="og:url" content="https://arantespp.com" />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:title" key="og:title" content={title} />
        <meta
          property="og:description"
          key="og:description"
          content="I'v created this website to make notes about the subjects I'm learning."
        />
        <meta property="og:image" key="og:image" content="/me.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
