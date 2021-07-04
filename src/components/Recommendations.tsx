import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import RecommendationsList from './RecommendationsList';

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
        borderTopColor: 'muted',
        borderWidth: 1,
        borderTopStyle: 'solid',
      }}
    >
      <Text
        id="recommendations"
        as="span"
        sx={{
          color: 'text',
          fontSize: [4, 5],
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Recommendations
      </Text>
      <NextLink href="/all" passHref>
        <Link
          sx={{
            fontSize: 1,
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          Do you want to see all posts instead?
        </Link>
      </NextLink>
      <RecommendationsList recommendations={recommendations} />
    </Flex>
  );
};

export default Recommendations;
