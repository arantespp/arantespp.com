import * as React from 'react';

import { Typography } from '@material-ui/core';
import Link from 'next/link';

const NavLink = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      <Typography color="primary" component="a">
        {name}
      </Typography>
    </Link>
  );
};

export default NavLink;
