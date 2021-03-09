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
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <NextLink href={href} passHref>
        <Link sx={{ fontSize: 2, marginBottom: 2, fontWeight: 'bold' }}>
          {title}
        </Link>
      </NextLink>
      <PostResume {...recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
