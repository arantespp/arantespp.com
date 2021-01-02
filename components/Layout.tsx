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
          marginTop: [4, null, 5],
          marginBottom: [4, null, 5],
          paddingX: [3, 4],
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
