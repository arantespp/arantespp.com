import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

import PostList from './PostsList';

const Post = ({
  content,
  title,
  posts,
}: {
  content: string;
  title: string;
  posts: Array<{ metadata: any }>;
}) => {
  return (
    <>
      <Box component="article">
        <Typography component="h2" variant="h3" align="center">
          {title}
        </Typography>
        <Box>
          <ReactMarkdown source={content} />
        </Box>
      </Box>
      <PostList posts={posts} />
    </>
  );
};

export default Post;
