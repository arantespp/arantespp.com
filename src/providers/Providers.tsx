import * as React from 'react';
import { ApiKeyProvider } from './ApiKey';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'theme-ui';
import { theme } from '../theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ApiKeyProvider>
          <>{children}</>
        </ApiKeyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
