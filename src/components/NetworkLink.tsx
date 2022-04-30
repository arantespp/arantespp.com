import { Link } from 'theme-ui';
import NextLink from 'next/link';

const NetworkLink = ({ nodeId }: { nodeId: string }) => (
    <NextLink href={`/network?node=${nodeId}`} passHref>
      <Link>The Network</Link>
    </NextLink>
  );

export default NetworkLink;
