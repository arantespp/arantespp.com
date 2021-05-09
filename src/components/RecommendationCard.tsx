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
        <Link
          as="h3"
          sx={{
            fontSize: 3,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'text',
          }}
        >
          {title}
        </Link>
      </NextLink>
      <PostResume post={recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
