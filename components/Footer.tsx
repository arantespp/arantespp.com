import * as React from 'react';

import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import NextLink from 'next/link';

import { socialMedias } from '../lib/socialMedias';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: { margin: theme.spacing(2), color: theme.palette.text.primary },
}));

const SocialLink: React.FC<{ href: string }> = ({ children, href }) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.link}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  const classes = useStyles();
  return (
    <Box mt={10} padding={[3, 6]} component="footer" className={classes.footer}>
      <NextLink href="/" passHref>
        <Typography variant="h3">Pedro Arantes</Typography>
      </NextLink>
      <Box mt={4}>
        {socialMedias.map(({ name, href, Icon }) => (
          <SocialLink key={name} href={href}>
            <Icon />
          </SocialLink>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
