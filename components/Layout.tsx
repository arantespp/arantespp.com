import { Container } from 'theme-ui';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as="main"
        sx={{
          marginTop: 5,
          marginBottom: 6,
          paddingX: [3, 4],
          maxWidth: '40em',
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
