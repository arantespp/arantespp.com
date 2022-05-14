import { Flex, Text } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMediasArr } from '../../lib/socialMedias';
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
      {socialMediasArr.map(({ href, faIcon, name }) => (
        <Link
          key={name}
          sx={{
            fontSize: 3,
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
        fontSize: 2,
        marginTop: 2,
        textAlign: 'center',
      }}
    >
      <span>This website is </span>
      <Link href="https://github.com/arantespp/arantespp.com">
        open-sourced
      </Link>
      <span> under </span>
      <Link href="/license">CC BY 4.0 license.</Link>
    </Text>
  </Flex>
);

export default Footer;
