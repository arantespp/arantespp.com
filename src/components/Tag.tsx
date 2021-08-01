import Link from './Link';

const Tag = ({ tag }: { tag: string }) => (
  <Link href={`/tags/${tag}`}>#{tag}</Link>
);

export default Tag;
