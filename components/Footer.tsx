import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import { socialMedias } from '../lib/socialMedias';

const Footer = () => {
  return (
    <Flex
      as="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: [3, 4],
        backgroundColor: 'muted',
      }}
    >
      <NextLink href="/" passHref>
        <Text sx={{ fontSize: [5], fontWeight: '500' }}>Pedro Arantes</Text>
      </NextLink>
      <Flex
        as="nav"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 3,
        }}
      >
        {socialMedias.map(({ name, href, faIcon }) => (
          <Link
            key={name}
            sx={{
              color: 'black',
              fontSize: 3,
              marginX: [2, 3],
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
