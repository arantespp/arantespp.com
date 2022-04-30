import * as React from 'react';
import { Flex } from 'theme-ui';
import { HeaderColorModeProps } from './HeaderColorMode';
import { HeaderTwitterProps } from './HeaderTwitter';
import Link from './Link';
import PedroArantes from './PedroArantes';
import dynamic from 'next/dynamic';

const HeaderColorMode = dynamic<HeaderColorModeProps>(() =>
  import('./HeaderColorMode').then((mod) => mod.HeaderColorMode),
);
const HeaderTwitter = dynamic<HeaderTwitterProps>(() =>
  import('./HeaderTwitter').then((mod) => mod.HeaderTwitter),
);

const FallbackNavIcon = () => <Flex sx={{ width: 22, height: 22 }} />;

const navs = [
  {
    label: 'Blog',
    href: '/blog',
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
    fontSize: [2, 3],
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
      <Link href="/" sx={{ color: 'text', textDecoration: 'none' }}>
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
          flexDirection: ['row', null, 'row'],
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: ['center', 'flex-start'],
          gap: [3, 3, 4],
        }}
      >
        {navs.map(({ href, label }) => (
          <Link key={href} href={href} sx={navSx}>
            {label}
          </Link>
        ))}
        <React.Suspense fallback={<FallbackNavIcon />}>
          <HeaderTwitter
            sx={{
              ...navSx,
              color: 'twitter',
              '&:hover': {
                color: 'twitter',
              },
              fontSize: [3, 4],
            }}
          />
        </React.Suspense>
        {/* <React.Suspense fallback={<FallbackNavIcon />}> */}
        <HeaderColorMode sx={{ ...navSx, color: undefined }} />
        {/* </React.Suspense> */}
      </Flex>
    </Flex>
  );
};

export default Header;
