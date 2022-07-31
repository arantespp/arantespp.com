import * as React from 'react';
import { Box } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import RecommendationCard from './RecommendationCard';

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  return (
    <>
      {recommendations.map((recommendation) => (
        <Box
          key={recommendation.href}
          sx={{ paddingTop: 0, paddingBottom: [4, 5] }}
        >
          <RecommendationCard recommendation={recommendation} />
        </Box>
      ))}
    </>
  );
};

export default RecommendationsList;
