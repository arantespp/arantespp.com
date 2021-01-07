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
          marginTop: [5, null, 5],
          marginBottom: [6],
          /**
           * To text doesn't touch the screen border.
           */
          paddingX: 3,
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
