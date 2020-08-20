import * as React from 'react';

import {
  Box,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { pascalCase } from 'change-case';
import Link from 'next/link';

import { GROUPS } from '../lib/groups';

import NavLink from './NavLink';
import Rose from './Rose';

const useClasses = makeStyles((theme) => ({
  name: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  rose: {
    position: 'relative',
    height: '1.25em',
    top: '1.5px',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      top: '2px',
      marginLeft: theme.spacing(1.5),
    },
  },
}));

const Header = () => {
  const classes = useClasses();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="header"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding={[2, 2, 4]}
      borderBottom={1}
      borderColor="primary.main"
    >
      <Link href="/" passHref>
        <Typography component="span" variant="h4" className={classes.name}>
          Pedro Arantes
          <Rose className={classes.rose} />
        </Typography>
      </Link>
      {isSmall ? (
        <>
          <IconButton
            aria-label="menu"
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            {GROUPS.map((group) => (
              <MenuItem key={group} onClick={handleClose}>
                <NavLink name={pascalCase(group)} href={`/${group}`} />
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Box component="nav" display="flex">
          {GROUPS.map((group) => (
            <Box key={group} mx={4}>
              <NavLink name={pascalCase(group)} href={`/${group}`} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(Header);
