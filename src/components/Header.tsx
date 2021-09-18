import { pascalCase } from 'change-case';

import { Flex } from 'theme-ui';

import Link from './Link';
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
      <Link href="/">
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
        }}
      >
        {navs.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
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
        ))}
      </Flex>
    </Flex>
  );
};

export default Header;
