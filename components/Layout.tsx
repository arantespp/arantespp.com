import * as React from 'react';

import { Container } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <>{children}</>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
