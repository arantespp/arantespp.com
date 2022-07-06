import { Flex, Text } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import Link from './Link';
import RecommendationsList from './RecommendationsList';

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
        paddingTop: 5,
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
      <Link
        href="/all"
        sx={{
          fontSize: 1,
          marginBottom: 4,
          textAlign: 'center',
        }}
      >
        Do you want to see all posts instead?
      </Link>
      <RecommendationsList recommendations={recommendations} />
    </Flex>
  );
};

export default Recommendations;
