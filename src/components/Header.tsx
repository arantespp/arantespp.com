import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Link } from 'theme-ui';

import PedroArantes from './PedroArantes';

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
      <NextLink href="/" passHref>
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
        }}
      >
        {navs.map(({ href, label }) => (
          <NextLink key={href} href={href} passHref>
            <Link
              sx={{
                fontSize: [2, 3],
                textAlign: 'center',
                textDecoration: 'none',
                marginX: [2, null, 3],
                cursor: 'pointer',
                color: 'primary',
                '&:hover': {
                  color: 'text',
                },
              }}
            >
              {pascalCase(label)}
            </Link>
          </NextLink>
        ))}
      </Flex>
    </Flex>
  );
};

export default Header;
