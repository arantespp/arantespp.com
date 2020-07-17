import * as React from 'react';

import { Box } from '@material-ui/core';

import NotFound from './NotFound';
import PostBody from './PostBody';
import PostList from './PostList';

import type { PostAndPostsRecommendations } from '../lib/files';

const Post = ({ post, recommendations }: PostAndPostsRecommendations) => {
  return (
    <>
      <Box component="article" my={5}>
        {post ? <PostBody {...post} /> : <NotFound />}
      </Box>
      <Box component="section" my={5}>
        <PostList recommendations={recommendations} />
      </Box>
    </>
  );
};

export default Post;
