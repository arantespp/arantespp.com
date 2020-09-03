import { useResponsiveValue } from '@theme-ui/match-media';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import 'typeface-quattrocento-sans';
import 'typeface-work-sans';

import Layout from '../components/Layout';

import { getTheme } from '../theme';

/**
 * Create this hook because theme is not updated initially.
 */
const useTheme = () => {
  const responsiveFontSize = useResponsiveValue(['16px', '18px', '20px']);
  const [baseFontSize, setBaseFontSize] = React.useState('16px');
  React.useEffect(() => {
    setTimeout(() => {
      setBaseFontSize(responsiveFontSize);
    }, 1);
  }, [responsiveFontSize]);
  return getTheme(baseFontSize);
};

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
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
