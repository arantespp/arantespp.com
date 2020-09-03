/** @jsx jsx */
import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { jsx } from 'theme-ui';

import { GROUPS } from '../lib/groups';

const Header = () => {
  return (
    <header
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
        <span
          sx={{
            fontSize: [5, null, 4],
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          Pedro Arantes
          <img sx={{ height: '1em', marginLeft: 1 }} src="/rose.png" />
        </span>
      </NextLink>
      <div sx={{ display: 'flex', flexDirection: ['column', null, 'row'] }}>
        {GROUPS.map((group) => (
          <NextLink key={group} href={`/${group}`}>
            <a
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
            </a>
          </NextLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
