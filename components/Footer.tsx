import * as React from 'react';

import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import { Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6),
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
    <Box mt={10} component="footer" className={classes.footer}>
      <NextLink href="/" passHref>
        <Typography variant="h3">Pedro Arantes</Typography>
      </NextLink>
      <Box mt={4}>
        <SocialLink href="https://twitter.com/arantespp">
          <Twitter />
        </SocialLink>
        <SocialLink href="https://facebook.com/arantespp">
          <Facebook />
        </SocialLink>
        <SocialLink href="https://instagram.com/arantespp_">
          <Instagram />
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/arantespp">
          <LinkedIn />
        </SocialLink>
      </Box>
    </Box>
  );
};

export default Footer;
