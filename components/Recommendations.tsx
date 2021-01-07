import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import RecommendationCard from './RecommendationCard';

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
        paddingTop: 4,
        borderTopColor: 'primary',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
      }}
    >
      <Text
        sx={{
          fontSize: 5,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Recommended Posts
      </Text>
      <NextLink href="/all-posts" passHref>
        <Link
          sx={{
            fontSize: 1,
            marginBottom: 3,
            textAlign: 'center',
          }}
        >
          Do you want to see all posts instead?
        </Link>
      </NextLink>
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.href}
          recommendation={recommendation}
        />
      ))}
    </Flex>
  );
};

export default Recommendations;
