import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import PedroArantes from './PedroArantes';

import { socialMediasArr } from '../lib/socialMedias';

const SHOW_LOGO = false;

const Footer = () => (
  <Flex
    as="footer"
    sx={{
      display: 'flex',
      flexDirection: ['column'],
      alignItems: 'center',
      justifyContent: 'center',
      padding: [3, 3],

      // backgroundColor: 'secondary',
    }}
  >
    {SHOW_LOGO && (
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
    )}
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
      {socialMediasArr.map(({ href, faIcon, name }) => (
        <Link
          key={name}
          sx={{
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
    <Text
      sx={{
        fontSize: 1,
        marginTop: 2,
        textAlign: 'center',
      }}
    >
      <span>This website is </span>
      <Link href="https://github.com/arantespp/arantespp.com">
        open sourced
      </Link>
      <span> under </span>
      <Link href="https://github.com/arantespp/arantespp.com/blob/main/LICENSE.md">
        CC BY 4.0 licence.
      </Link>
    </Text>
  </Flex>
);

export default Footer;
