import * as React from 'react';
import { Box, Container } from 'theme-ui';
import { useApiKey } from '../hooks/useApiKey';
import Footer from './Footer';
import Header from './Header';
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
          marginTop: [5],
          marginBottom: [5],
          /**
           * To text doesn't touch the screen border.
           */
          paddingX: 3,
        }}
      >
        {children}
      </Container>
      <Box
        sx={{
          marginTop: [5, 5, 6],
          marginBottom: [5],
          padding: [4, 4],
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container>
          <Newsletter />
        </Container>
      </Box>
      <Footer />
      {apiKey && <TweetScheduler />}
    </>
  );
};

export default Layout;
