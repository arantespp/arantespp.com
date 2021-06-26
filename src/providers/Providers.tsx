import { ThemeProvider } from 'theme-ui';

import { theme } from '../theme';

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
