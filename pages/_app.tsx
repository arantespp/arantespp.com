import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import Layout from '../components/Layout';

import { theme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Pedro Arantes' Blog</title>
        <meta property="og:url" key="og:url" content="https://arantespp.com" />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:title" key="og:title" content="Pedro Arantes blog" />
        <meta
          property="og:description"
          key="og:description"
          content="I use this blog as a online note of the subjects I study about."
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
