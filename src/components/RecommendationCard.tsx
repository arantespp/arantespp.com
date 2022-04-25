import {
  faLink,
  faPen,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Text } from 'theme-ui';

import Link from './Link';

import PostResume from './PostResume';

import type { Recommendation } from '../../lib/files';

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
  const { href, title, isReference, draft, as } = recommendation;

  const hrefLink = (() => {
    if (draft) {
      return href;
    }

    return as || href;
  })();

  return (
    <Flex
      key={title}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link
        href={hrefLink}
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

      <PostResume post={recommendation} />
    </Flex>
  );
};

export default RecommendationCard;
