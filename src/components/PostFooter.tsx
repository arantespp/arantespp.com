import { Draft, Post } from '../../lib/files';
import { Flex } from 'theme-ui';

export const PostFooter = ({ post }: { post: Post | Draft }) => {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        marginY: 1,
      }}
    />
  );
};
