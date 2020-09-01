/** @jsx jsx */
import { jsx } from 'theme-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';

import { socialMedias } from '../lib/socialMedias';

const Footer = () => {
  return (
    <footer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: [3, 4],
        backgroundColor: 'muted',
      }}
    >
      <NextLink href="/" passHref>
        <span sx={{ fontSize: [4, 5], fontWeight: '500' }}>Pedro Arantes</span>
      </NextLink>
      <nav
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 3,
        }}
      >
        {socialMedias.map(({ name, href, faIcon }) => (
          <a
            key={name}
            sx={{
              color: 'black',
              fontSize: [2, 3],
              marginX: 2,
            }}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            <FontAwesomeIcon icon={faIcon} />
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
