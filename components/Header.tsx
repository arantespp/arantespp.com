import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { pascalCase } from 'change-case';
import Link from 'next/link';

import NavLink from './NavLink';

import { groups } from '../lib/groups';

const Header = () => {
  return (
    <Box
      component="header"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p={[0, 2, 4]}
      borderBottom={1}
      borderColor="primary.main"
    >
      <Link href="/" passHref>
        <Typography variant="h4">Pedro Arantes</Typography>
      </Link>
      <Box>
        {groups.map((group) => (
          <NavLink key={group} name={pascalCase(group)} href={`/${group}`} />
        ))}
      </Box>
      {/* <div /> */}
    </Box>
  );
};

export default Header;
