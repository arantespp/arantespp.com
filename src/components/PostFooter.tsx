import { Draft, Post } from '../../lib/files';
import { Flex } from 'theme-ui';
import NetworkLink from './NetworkLink';

export const PostFooter = ({ post }: { post: Post | Draft }) => {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          fontSize: 1,
          textAlign: 'center',
        }}
      >
        <NetworkLink nodeId={post.href} />
      </Flex>
    </Flex>
  );
};

export default PostFooter;
