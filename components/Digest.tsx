import { Flex, Link } from 'theme-ui';

const Digest = () => {
  return (
    <Flex sx={{ justifyContent: 'center', textAlign: 'center', marginY: 5 }}>
      <Link href="http://digest.arantespp.com/">
        Subscribe to my weekly digest to follow my most recent posts.
      </Link>
    </Flex>
  );
};

export default Digest;
