import * as React from 'react';
import { Box, Text } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { useFlashcard } from '../hooks/useFlashcard';
import Link from './Link';
import RecommendationCard from './RecommendationCard';

const Card = ({
  recommendation,
  isFlashcard,
}: {
  recommendation: Recommendation;
  isFlashcard?: boolean;
}) => {
  return (
    <Box sx={{ paddingTop: 3, paddingBottom: 4 }}>
      {isFlashcard && (
        <Text sx={{ fontSize: 0, fontStyle: 'italic' }}>
          <Link href="/flashcard">Flashcard</Link>
        </Text>
      )}
      <RecommendationCard recommendation={recommendation} />
    </Box>
  );
};

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  const { flashcard } = useFlashcard();

  return (
    <>
      {recommendations.map((recommendation) => (
        <Card key={recommendation.href} recommendation={recommendation} />
      ))}
      {flashcard && <Card recommendation={flashcard} isFlashcard />}
    </>
  );
};

export default RecommendationsList;
