import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import PedroArantes from '../components/PedroArantes';

import { socialMedias } from '../lib/socialMedias';

const Footer = () => {
  return (
    <Flex
      as="footer"
      sx={{
        display: 'flex',
        flexDirection: ['column'],
        alignItems: 'center',
        justifyContent: 'center',
        padding: [3, 4],
      }}
    >
      <NextLink href="/" passHref>
        <PedroArantes
          sx={{
            color: 'gray',
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
              color: 'gray',
              fontSize: 3,
              marginX: [2],
            }}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            <FontAwesomeIcon icon={faIcon} />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default Footer;
