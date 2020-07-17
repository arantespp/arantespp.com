import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';

import type { PostAndPostsRecommendations } from '../lib/files';

type Recommendations = PostAndPostsRecommendations['recommendations'];

const PostsList = ({
  recommendations,
}: {
  recommendations: Recommendations;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      borderTop={1}
      borderColor="primary.main"
    >
      <Box mt={3} mb={2}>
        <Typography variant="h4">More posts</Typography>
      </Box>
      {recommendations.map(({ href, title, excerpt, date }) => {
        return (
          <Box my={1} key={title} display="flex" flexDirection="column">
            <Link as={href} href="/[group]/[slug]" passHref>
              <Typography color="primary" component="a">
                {title}
              </Typography>
            </Link>
            <Typography component="span" variant="body1">
              {excerpt}
            </Typography>
            <Typography component="span" variant="body2">
              {date}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default PostsList;
