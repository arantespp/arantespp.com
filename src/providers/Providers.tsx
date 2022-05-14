import * as React from 'react';
import { ApiKeyProvider } from './ApiKey';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme';
import Loading from '../components/Loading';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ApiKeyProvider>
            <>{children}</>
          </ApiKeyProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
};

export default Providers;
