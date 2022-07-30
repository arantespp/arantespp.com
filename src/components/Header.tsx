import * as React from 'react';
import { Flex } from 'theme-ui';
import HeaderColorMode from './HeaderColorMode';
import HeaderTwitter from './HeaderTwitter';
import Link from './Link';
import PedroArantes from './PedroArantes';

const navs = [
  {
    label: 'Home',
    href: '/',
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
  const navSx: any = {
    fontSize: [1, 2],
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'text',
    '&:hover': {
      color: 'primary',
    },
  };

  return (
    <Flex
      as="header"
      sx={{
        width: '100%',
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
      <Link
        href="/"
        sx={{
          color: 'text',
          textDecoration: 'none',
          ':hover': { color: 'text' },
        }}
      >
        <PedroArantes
          sx={{
            fontSize: [4, 4],
            fontWeight: '600',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Flex
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: ['center', 'baseline'],
          gap: [4, 4, 4],
        }}
      >
        {navs.map(({ href, label }) => (
          <Link key={href} href={href} sx={navSx}>
            {label}
          </Link>
        ))}
        <HeaderTwitter
          sx={{
            ...navSx,
            width: 24,
            color: 'twitter',
            '&:hover': {
              color: 'twitter',
            },
            position: 'relative',
            top: [0, '2px'],
            fontSize: [3, 4],
          }}
        />
        <HeaderColorMode
          sx={{ ...navSx, fontSize: [1, 2], color: undefined }}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
