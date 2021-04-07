import { Box } from 'theme-ui';

import type { Recommendation } from '../lib/files';

import RecommendationCard from './RecommendationCard';

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => (
  <>
    {recommendations.map((recommendation) => (
      <Box sx={{ marginTop: 4, marginBottom: 3 }} key={recommendation.href}>
        <RecommendationCard recommendation={recommendation} />
      </Box>
    ))}
  </>
);

export default RecommendationsList;
