import NextLink from 'next/link';
import { Flex, Link } from 'theme-ui';

import PostResume from './PostResume';

import type { Recommendation } from '../lib/files';

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { href, title } = recommendation;
  return (
    <Flex
      key={title}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NextLink href={href} passHref>
        <Link sx={{ fontSize: 3, marginBottom: 2, fontWeight: 'bold' }}>
          {title}
        </Link>
      </NextLink>
      <PostResume post={recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
