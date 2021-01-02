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
  return (
    <Flex
      as="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        paddingTop: 4,
        borderTopColor: 'muted',
        borderTopWidth: 2,
        borderTopStyle: 'solid',
      }}
    >
      <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>More posts</Text>
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
              <Link sx={{ fontSize: 3 }}>{title}</Link>
            </NextLink>
            <PostResume {...recommendation} />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Recommendations;
