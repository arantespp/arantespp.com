import Link from './Link';

export const NetworkLink = ({ nodeId }: { nodeId: string }) => (
  <Link href={`/network?node=${nodeId}`}>The Network</Link>
);
