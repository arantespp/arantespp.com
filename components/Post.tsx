/** @jsx jsx */
import { jsx } from 'theme-ui';

import NotFound from './NotFound';
import PostBody from './PostBody';
import PostList from './PostList';

import type { PostAndPostsRecommendations } from '../lib/files';

const Post = ({ post, recommendations }: PostAndPostsRecommendations) => {
  return (
    <div>
      <>{post ? <PostBody {...post} /> : <NotFound />}</>
      <div
        sx={{
          borderBottom: 0,
          borderColor: 'muted',
          marginY: [4, null, 5],
        }}
      />
      <PostList recommendations={recommendations} />
    </div>
  );
};

export default Post;
