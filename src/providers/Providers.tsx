import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'theme-ui';

import { theme } from '../theme';

import { ApiKeyProvider } from './ApiKey';

const queryClient = new QueryClient();

const Providers: React.FC = ({ children }) => {
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
