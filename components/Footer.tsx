import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';

import { socialMedias } from '../lib/socialMedias';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-gray-200 p-3 sm:p-10">
      <NextLink href="/" passHref>
        <span className="text-4xl font-medium">Pedro Arantes</span>
      </NextLink>
      <div className="flex flex-wrap mt-3 space-x-5">
        {socialMedias.map(({ name, href, faIcon }) => (
          <a
            key={name}
            className="text-black text-xl"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            <FontAwesomeIcon icon={faIcon} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
