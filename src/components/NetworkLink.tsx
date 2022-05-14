import Link from './Link';

const NetworkLink = ({ nodeId }: { nodeId: string }) => (
  <Link href={`/network?node=${nodeId}`}>The Network</Link>
);

export default NetworkLink;
