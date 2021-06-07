import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import PostResume from './PostResume';

import type { Recommendation } from '../lib/files';

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { href, title, isReference } = recommendation;
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
          {isReference && (
            <Text
              sx={{
                fontSize: 0,
                marginLeft: 2,
                verticalAlign: 'middle',
                color: 'muted',
              }}
            >
              <FontAwesomeIcon icon={faLink} />
            </Text>
          )}
        </Link>
      </NextLink>
      <PostResume post={recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
