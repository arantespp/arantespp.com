import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Text, useThemeUI } from 'theme-ui';

import { socialMedias } from '../../lib/socialMedias';

import Link from './Link';
import PedroArantes from './PedroArantes';

const SHOW_TOGGLE_MODE = false;

const navs = [
  {
    label: 'Articles',
    href: '/articles',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Now',
    href: '/now',
  },
];

const Header = () => {
  const { colorMode, setColorMode } = useThemeUI();

  const navSx: any = {
    fontSize: [2, 3],
    textAlign: 'center',
    textDecoration: 'none',
    marginX: [2, null, 3],
    cursor: 'pointer',
    color: 'primary',
    '&:hover': {
      color: 'text',
    },
  };

  return (
    <Flex
      as="header"
      sx={{
        display: 'flex',
        flexDirection: ['column', null, 'row'],
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: [3, null, 4],
        paddingX: [1, 1, 3, 5],
        borderWidth: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      }}
    >
      {/* Should use NextLink because of styles. */}
      <NextLink href="/">
        <PedroArantes
          sx={{
            fontSize: [4, 4],
            fontWeight: '600',
            cursor: 'pointer',
          }}
        />
      </NextLink>
      <Flex
        sx={{
          display: 'flex',
          flexDirection: ['row', null, 'row'],
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {navs.map(({ href, label }) => (
          <Link key={href} href={href} sx={navSx}>
            {pascalCase(label)}
          </Link>
        ))}
        <Link
          sx={{ ...navSx, color: 'twitter' }}
          target="_blank"
          rel="noopener noreferrer"
          href={socialMedias.Twitter.href}
          aria-label={socialMedias.Twitter.username}
        >
          <FontAwesomeIcon icon={socialMedias.Twitter.faIcon} />
        </Link>
        {setColorMode && SHOW_TOGGLE_MODE && (
          <Text
            sx={{ ...navSx, color: undefined }}
            onClick={() => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default');
            }}
          >
            <FontAwesomeIcon icon={faSun} />
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
