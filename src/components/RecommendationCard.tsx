import {
  faLink,
  faPen,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NextLink from 'next/link';
import { Flex, Link, Text } from 'theme-ui';

import PostResume from './PostResume';

import type { Recommendation } from '../lib/files';

const IconText = ({ icon }: { icon: IconDefinition }) => (
  <Text
    sx={{
      fontSize: 0,
      marginLeft: 2,
      color: 'muted',
    }}
  >
    <FontAwesomeIcon icon={icon} />
  </Text>
);

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { href, title, isReference, draft } = recommendation;
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
          sx={{
            fontSize: 3,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'text',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {title}
          {isReference && <IconText icon={faLink} />}
          {draft && <IconText icon={faPen} />}
        </Link>
      </NextLink>
      <PostResume post={recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
