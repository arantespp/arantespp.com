import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Link } from 'theme-ui';

import PedroArantes from '../components/PedroArantes';

import { GROUPS } from '../lib/groups';

const Header = () => {
  return (
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
      <Flex sx={{ display: 'flex', flexDirection: ['row', null, 'row'] }}>
        {GROUPS.map((group) => (
          <NextLink key={group} href={`/${group}`}>
            <Link
              sx={{
                fontSize: [2, 3],
                color: 'primary',
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
};

export default Header;
