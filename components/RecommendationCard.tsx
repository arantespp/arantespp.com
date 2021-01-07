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
        marginBottom: 3,
      }}
    >
      <NextLink as={href} href="/[group]/[slug]" passHref>
        <Link sx={{ fontSize: 3, marginBottom: 2 }}>{title}</Link>
      </NextLink>
      <PostResume {...recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
