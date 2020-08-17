import * as React from 'react';

import { Box, makeStyles, Typography } from '@material-ui/core';
import { pascalCase } from 'change-case';
import Link from 'next/link';

import type { PostAndPostsRecommendations } from '../lib/files';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: 0,
  },
  excerpt: {
    fontStyle: 'italic',
    margin: 0,
  },
}));

type Recommendations = PostAndPostsRecommendations['recommendations'];

const PostsList = ({
  recommendations,
}: {
  recommendations: Recommendations;
}) => {
  const classes = useStyles();

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
      {recommendations.map(({ href, title, excerpt, date, group }) => {
        return (
          <Box my={2} key={title} display="flex" flexDirection="column">
            <Link as={href} href="/[group]/[slug]" passHref>
              <Typography
                color="primary"
                component="a"
                className={classes.link}
              >
                {title}
              </Typography>
            </Link>
            <Typography
              component="span"
              variant="body1"
              className={classes.excerpt}
            >
              "{excerpt.replace(/"/g, '')}"
            </Typography>
            <Typography component="span" variant="body2" color="textSecondary">
              {`${pascalCase(group)} - ${date}`}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default PostsList;
