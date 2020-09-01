import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import * as React from 'react';
import { Box, Image, Link, Text } from 'theme-ui';

import { GROUPS } from '../lib/groups';

const Header = () => {
  return (
    <Box
      as="header"
      sx={{
        display: 'flex',
        flexDirection: ['column', null, 'row'],
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid',
        borderBottomColor: 'muted',
        padding: [3, null, 4],
      }}
    >
      <NextLink href="/" passHref>
        <Text
          as="span"
          sx={{
            fontSize: 4,
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
      <Box sx={{ display: 'flex', flexDirection: ['column', null, 'row'] }}>
        {GROUPS.map((group) => (
          <NextLink key={group} href={`/${group}`}>
            <Link
              sx={{
                color: 'primary',
                textAlign: 'center',
                textDecoration: 'underline',
                marginX: [2, 3],
                cursor: 'pointer',
              }}
            >
              {pascalCase(group)}
            </Link>
          </NextLink>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(Header);
