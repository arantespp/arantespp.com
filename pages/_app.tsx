import { AppProps } from 'next/app';
import * as React from 'react';
import { ThemeProvider } from 'theme-ui';

import Layout from '../components/Layout';

import { getTheme } from '../theme';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = getTheme();
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
