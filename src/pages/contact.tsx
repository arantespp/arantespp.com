import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { Flex, Link, Themed, Text } from 'theme-ui';

import { socialMedias, socialMediasArr } from '../lib/socialMedias';

const Contact = () => (
  <>
    <Head>
      <title>Contact</title>
    </Head>

    <Themed.h1>Contact</Themed.h1>

    <Themed.p>
      If you&apos;d like to get in touch with me,{' '}
      <Link
        href={socialMedias.Email.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text as="span">email </Text>
        <FontAwesomeIcon icon={socialMedias.Email.faIcon} />
      </Link>{' '}
      and{' '}
      <Link
        href={socialMedias.Twitter.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text as="span">Twitter </Text>
        <FontAwesomeIcon icon={socialMedias.Twitter.faIcon} />
      </Link>{' '}
      are your best channels because I check them more frequently.
    </Themed.p>

    <Themed.p>
      You can find me at almost all social media by the username
      <Themed.strong> arantespp</Themed.strong>*. Some of them I just created to
      get the username and I don&apos;t use very often.
    </Themed.p>

    <Flex
      sx={{
        marginY: 4,
        flexDirection: ['row', 'column'],
        justifyContent: ['center'],
        flexWrap: 'wrap',
      }}
    >
      {socialMediasArr.map(({ href, faIcon, name }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            margin: 2,
            '&:hover': {
              color: 'primary',
            },
          }}
          title={name}
        >
          <Text
            as="span"
            sx={{
              fontSize: [5, 3],
              marginX: 2,
            }}
          >
            <FontAwesomeIcon icon={faIcon} />
          </Text>
          <Text
            as="span"
            sx={{
              display: ['none', 'inline'],
              marginLeft: 1,
              overflowWrap: 'break-word',
            }}
          >
            {href}
          </Text>
        </Link>
      ))}
    </Flex>

    <Text sx={{ fontSize: 1, fontStyle: 'italic', color: 'gray' }}>
      * I know, it&apos;s very sad, but Instagram is the only social media that
      I don&apos;t have <Themed.strong>arantespp</Themed.strong> as username.
      Sometime ago I&apos;ve create the account with that username but I
      couldn&apos;t remember the password, the email or even if I&apos;ve
      deleted the account or not.
    </Text>
  </>
);

export default Contact;
