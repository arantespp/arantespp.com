import * as React from 'react';

import { pascalCase } from 'change-case';
import Link from 'next/link';

import { GROUPS } from '../lib/groups';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center border-b-2 p-2 md:p-6 cursor-pointer">
      <Link href="/" passHref>
        <span className="text-3xl flex items-center whitespace-no-wrap">
          Pedro Arantes
          <img className="h-8 ml-3" src="/rose.png" />
        </span>
      </Link>
      <nav className="flex flex-col md:flex-row">
        {GROUPS.map((group) => (
          <Link key={group} href={`/${group}`}>
            <a className="text-red-700 text-xl text-center mx-2 md:mx-8 underline">
              {pascalCase(group)}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default React.memo(Header);
