import { Flex, Link } from 'theme-ui';

import { Post } from '../../lib/files';

const TEMP = true;

const SharePost = ({ post: { title } }: { post: Post }) => {
  if (TEMP) {
    return null;
  }

  return (
    <Flex>
      <Link href={`https://twitter.com/share?text=${title}&via=arantespp`}>
        {/* <FontAwesomeIcon icon={faTwitter} /> */}
      </Link>
    </Flex>
  );
};

export default SharePost;
