import NextLink from 'next/link';
import { Link } from 'theme-ui';

const Tag = ({ tag }: { tag: string }) => (
  <NextLink href={`/tags/${tag}`} passHref>
    <Link variant="tag">#{tag}</Link>
  </NextLink>
);

export default Tag;
