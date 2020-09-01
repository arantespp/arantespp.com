import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Box, Text } from 'theme-ui';

import type { PostAndPostsRecommendations } from '../lib/files';

type Recommendations = PostAndPostsRecommendations['recommendations'];

const PostsList = ({
  recommendations,
}: {
  recommendations: Recommendations;
}) => {
  return (
    <Box as="section" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Text as="span" sx={{ fontSize: 3, fontWeight: 'bold' }}>
        More posts
      </Text>
      {recommendations.map(({ href, title, excerpt, date, group }) => {
        return (
          <Box
            key={title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 4,
            }}
          >
            <NextLink as={href} href="/[group]/[slug]" passHref>
              <Text as="a" sx={{ fontSize: 2 }}>
                {title}
              </Text>
            </NextLink>
            <Text as="span" sx={{ fontSize: [2], fontStyle: 'italic' }}>
              "{excerpt.replace(/"/g, '')}"
            </Text>
            <Text as="span" sx={{ color: 'gray', fontSize: 1 }}>
              {`${pascalCase(group)} - ${date}`}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default PostsList;
