import * as React from 'react';
import { Box, Container } from 'theme-ui';
import { useApiKey } from '../hooks/useApiKey';
import Header from './Header'; // Don't dynamic import Header because of cumulative shift layout.
import Loading from './Loading';
import Newsletter from './Newsletter';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'));
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
        <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
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
