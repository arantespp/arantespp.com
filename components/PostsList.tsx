import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';

const PostLink = ({ href, name }: { href: string; name: string }) => {
  return (
    <Link as={href} href="/[group]/[slug]" passHref>
      <Typography color="primary" component="a">
        {name}
      </Typography>
    </Link>
  );
};

const PostsList = ({ posts }: { posts: Array<{ metadata: any }> }) => {
  const validPosts = posts.filter(({ metadata }) => {
    const { slug, title } = metadata;
    return slug && title;
  });

  return (
    <Box display="flex" flexDirection="column">
      <Typography>See more posts</Typography>
      {validPosts.map(({ metadata }) => {
        return (
          <PostLink
            key={metadata.href}
            name={metadata.title}
            href={metadata.href}
          />
        );
      })}
    </Box>
  );
};

export default PostsList;
