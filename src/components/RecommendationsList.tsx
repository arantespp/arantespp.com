import * as React from 'react';
import { Box } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import RecommendationCard from './RecommendationCard';

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => (
  <>
    {recommendations.map((recommendation) => (
      <Box sx={{ paddingTop: 3, paddingBottom: 4 }} key={recommendation.href}>
        <RecommendationCard recommendation={recommendation} />
      </Box>
    ))}
  </>
);

export default RecommendationsList;
