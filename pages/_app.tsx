import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import Layout from '../components/Layout';

import { getTheme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = getTheme();
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Pedro Arantes' Blog</title>
        <meta property="og:url" content="https://arantespp.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pedro Arantes blog" />
        <meta
          property="og:description"
          content="I use this blog as a online note of the subjects I study about."
        />
        <meta property="og:image" content="/me.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
