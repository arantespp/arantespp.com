import { Flex, Text } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSocialMediasArr } from '../../lib/socialMedias';
import Link from '../components/Link';

const Footer = () => (
  <Flex
    as="footer"
    sx={{
      display: 'flex',
      flexDirection: ['column'],
      alignItems: 'center',
      justifyContent: 'center',
      padding: [3, 3],
    }}
  >
    <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 2 }}>
      {getSocialMediasArr().map(({ href, faIcon, name }) => (
        <Link
          key={name}
          sx={{
            fontSize: [1, 2, 3],
            marginX: [2],
          }}
          href={href}
        >
          <FontAwesomeIcon icon={faIcon} />
        </Link>
      ))}
    </Flex>
    <Text
      sx={{
        fontSize: [0, 1],
        marginTop: 2,
        textAlign: 'center',
      }}
    >
      Hello, my name is Pedro. Welcome to my blog!
    </Text>
  </Flex>
);

export default Footer;
