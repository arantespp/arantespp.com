import * as React from 'react';

import { Container } from '@material-ui/core';

import Header from './Header';

const Layout: React.FC<{ groups: string[] }> = ({ children, groups }) => {
  return (
    <>
      <Header groups={groups} />
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

export default Layout;
