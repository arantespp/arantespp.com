import { Box, Flex, Text } from 'theme-ui';
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
          fontSize: [4, 4],
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Recommendations
      </Text>
      <Link
        href="/all"
        sx={{
          fontSize: [0, 1],
          textAlign: 'center',
          marginBottom: 3,
        }}
      >
        Do you want to see all posts instead?
      </Link>
      <Box sx={{ marginTop: 5 }}>
        <RecommendationsList recommendations={recommendations} />
      </Box>
    </Flex>
  );
};

export default Recommendations;
