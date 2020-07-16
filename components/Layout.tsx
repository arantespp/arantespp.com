import * as React from 'react';

import { Container } from '@material-ui/core';

import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

export default Layout;
