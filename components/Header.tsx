import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Image, Link, Text } from 'theme-ui';

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
        borderBottom: 0,
        borderBottomColor: 'muted',
        padding: [3, null, 4],
        backgroundColor: 'muted',
      }}
    >
      <NextLink href="/" passHref>
        <Text
          sx={{
            fontSize: [5],
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          Pedro Arantes
          <Image sx={{ height: '1em', marginLeft: 1 }} src="/rose.png" />
        </Text>
      </NextLink>
      <Flex sx={{ display: 'flex', flexDirection: ['column', null, 'row'] }}>
        {GROUPS.map((group) => (
          <NextLink key={group} href={`/${group}`}>
            <Link
              sx={{
                fontSize: [3],
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
