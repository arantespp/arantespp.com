import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import PostResume from './PostResume';

import type { Recommendation } from '../lib/files';

const Recommendations = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Flex
      as="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        paddingTop: 4,
        borderTopColor: 'primary',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      }}
    >
      <Text sx={{ fontSize: 5, fontWeight: 'bold' }}>More Posts</Text>
      {recommendations.map((recommendation) => {
        const { href, title } = recommendation;
        return (
          <Flex
            key={title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 4,
            }}
          >
            <NextLink as={href} href="/[group]/[slug]" passHref>
              <Link sx={{ fontSize: 3, marginBottom: 2 }}>{title}</Link>
            </NextLink>
            <PostResume {...recommendation} />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Recommendations;
