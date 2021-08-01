import Link from './Link';

const Tag = ({ tag }: { tag: string }) => (
  <Link href={`/tags/${tag}`} variant="tag">
    #{tag}
  </Link>
);

export default Tag;
