import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Link } from 'theme-ui';

import PedroArantes from './PedroArantes';

import { socialMedias } from '../lib/socialMedias';

const Footer = () => (
  <Flex
    as="footer"
    sx={{
      display: 'flex',
      flexDirection: ['column'],
      alignItems: 'center',
      justifyContent: 'center',
      padding: [3, 3],
      backgroundColor: 'primary',
    }}
  >
    <NextLink href="/" passHref>
      <PedroArantes
        sx={{
          color: 'white',
          cursor: 'pointer',
          fontSize: [3],
          fontWeight: '500',
          marginRight: [0, 2],
        }}
      />
    </NextLink>
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
      {socialMedias.map(({ name, href, faIcon }) => (
        <Link
          key={name}
          sx={{
            color: 'white',
            fontSize: 3,
            marginX: [2],
          }}
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          aria-label={name}
        >
          <FontAwesomeIcon icon={faIcon} />
        </Link>
      ))}
    </Flex>
  </Flex>
);

export default Footer;
