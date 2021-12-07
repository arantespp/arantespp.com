import { ThemeProvider } from 'theme-ui';

import { theme } from '../theme';

import { ApiKeyProvider } from './ApiKey';

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApiKeyProvider>{children}</ApiKeyProvider>
    </ThemeProvider>
  );
};

export default Providers;
