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
        <Box key={recommendation.href} sx={{ paddingTop: 3, paddingBottom: 4 }}>
          <RecommendationCard recommendation={recommendation} />
        </Box>
      ))}
    </>
  );
};

export default RecommendationsList;
