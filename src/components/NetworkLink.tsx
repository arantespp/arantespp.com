import NextLink from 'next/link';
import { Link } from 'theme-ui';

const NetworkLink = ({ nodeId }: { nodeId: string }) => (
    <NextLink href={`/network?node=${nodeId}`} passHref>
      <Link>The Network</Link>
    </NextLink>
  );

export default NetworkLink;
