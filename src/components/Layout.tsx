import { Box, Container } from 'theme-ui';

import Footer from './Footer';
import Header from './Header';
import Newsletter from './Newsletter';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        as="main"
        sx={{
          marginTop: [4, 4, 5],
          marginBottom: [5],
          /**
           * To text doesn't touch the screen border.
           */
          paddingX: 3,
        }}
      >
        {children}
        <Box sx={{ marginTop: 6 }}>
          <Newsletter />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
