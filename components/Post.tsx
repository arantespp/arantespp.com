import { Box } from 'theme-ui';

import NotFound from './NotFound';
import PostBody from './PostBody';
import PostList from './PostList';

import type { PostAndPostsRecommendations } from '../lib/files';

const Post = ({ post, recommendations }: PostAndPostsRecommendations) => {
  return (
    <div>
      <>{post ? <PostBody {...post} /> : <NotFound />}</>
      <Box
        sx={{
          border: '2px solid',
          borderColor: 'muted',
          marginY: [5],
        }}
      />
      <PostList recommendations={recommendations} />
    </div>
  );
};

export default Post;
