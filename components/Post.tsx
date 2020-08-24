import * as React from 'react';

import NotFound from './NotFound';
import PostBody from './PostBody';
import PostList from './PostList';

import type { PostAndPostsRecommendations } from '../lib/files';

const Post = ({ post, recommendations }: PostAndPostsRecommendations) => {
  return (
    <div className="mx-3">
      <>{post ? <PostBody {...post} /> : <NotFound />}</>
      <div className="border-b-2 mt-12 mb-8" />
      <PostList recommendations={recommendations} />
    </div>
  );
};

export default Post;
