import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkProps } from 'theme-ui';

import { socialMedias } from '../../lib/socialMedias';

import Link from './Link';

export type HeaderTwitterProps = LinkProps;

export const HeaderTwitter = (props: HeaderTwitterProps) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={socialMedias.Twitter.href}
      aria-label={socialMedias.Twitter.username}
      {...props}
    >
      <FontAwesomeIcon icon={socialMedias.Twitter.faIcon} />
    </Link>
  );
};

export default HeaderTwitter;
