import NextLink from 'next/link';
import { Link } from 'theme-ui';

const Tag = ({ tag }: { tag: string }) => {
  return (
    <NextLink href={`/tags/${tag}`} passHref>
      <Link sx={{ fontSize: 1, paddingRight: 2 }}>#{tag}</Link>
    </NextLink>
  );
};

export default Tag;
