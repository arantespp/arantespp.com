import * as React from 'react';
import { Box, Container } from 'theme-ui';
import { useApiKey } from '../hooks/useApiKey';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import Newsletter from './Newsletter';
import dynamic from 'next/dynamic';

const TweetScheduler = dynamic(() => import('./TweetScheduler'));

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { apiKey } = useApiKey();

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
      {apiKey && <TweetScheduler />}
    </>
  );
};

export default Layout;
