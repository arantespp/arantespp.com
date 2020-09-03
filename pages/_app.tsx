import { useResponsiveValue } from '@theme-ui/match-media';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'theme-ui';

import 'typeface-quattrocento-sans';
import 'typeface-work-sans';

import Layout from '../components/Layout';

import { getTheme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const baseFontSize = useResponsiveValue(['16px', '18px', '20px']);
  return (
    <ThemeProvider theme={getTheme(baseFontSize)}>
      <Head>
        <title>Pedro Arantes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
