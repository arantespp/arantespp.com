import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Link } from 'theme-ui';

import PedroArantes from './PedroArantes';

import { GROUPS } from '../lib/groups';

const navs = [...GROUPS, 'now'];

const Header = () => (
  <Flex
    as="header"
    sx={{
      display: 'flex',
      flexDirection: ['column', null, 'row'],
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: [3, null, 4],
      borderWidth: 1,
      borderColor: 'primary',
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
      {navs.map((group) => (
        <NextLink key={group} href={`/${group}`}>
          <Link
            sx={{
              fontSize: [2, 2],
              textAlign: 'center',
              textDecoration: 'underline',
              marginX: [2, null, 3],
              cursor: 'pointer',
            }}
          >
            {pascalCase(group)}
          </Link>
        </NextLink>
      ))}
    </Flex>
  </Flex>
);

export default Header;
