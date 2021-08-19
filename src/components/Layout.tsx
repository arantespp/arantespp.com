import { useRouter } from 'next/router';
import { Box, Container } from 'theme-ui';

import Footer from './Footer';
import Header from './Header';
import Newsletter from './Newsletter';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header />
      <Container
        as="main"
        sx={{
          maxWidth: ['/network'].includes(pathname) ? '100%' : undefined,
          marginTop: [4, 4, 5],
          marginBottom: [6],
          /**
           * To text doesn't touch the screen border.
           */
          paddingX: 3,
        }}
      >
        {children}
        <Box sx={{ marginY: 6 }}>
          <Newsletter />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
