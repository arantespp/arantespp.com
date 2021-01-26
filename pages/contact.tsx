import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';

import { Box, Link, Styled, Text } from 'theme-ui';

import { socialMedias } from '../lib/socialMedias';

const Contact = () => {
  const twitter = socialMedias.find(({ name }) => name === 'Twitter')!;
  const email = socialMedias.find(({ name }) => name === 'Email')!;

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Styled.h1>Contact</Styled.h1>
      <Styled.p>
        If you'd like to get in touch with me,{' '}
        <Link href={email.href} target="_blank" rel="noopener noreferrer">
          <Text as="span">email </Text>
          <FontAwesomeIcon icon={email.faIcon} />
        </Link>{' '}
        and{' '}
        <Link href={twitter.href} target="_blank" rel="noopener noreferrer">
          <Text as="span">Twitter </Text>
          <FontAwesomeIcon icon={twitter.faIcon} />
        </Link>{' '}
        are your best channels because I check them more frequently.
      </Styled.p>
      <Styled.p>
        You can find me at almost all social media by the username
        <strong> arantespp</strong>*. Some of them I just created to get the
        username and I don't use very often.
      </Styled.p>
      <Box sx={{ marginY: 3 }}>
        <Styled.ul>
          {socialMedias.map(({ href, name, faIcon }) => {
            return (
              <Styled.li key={name}>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Text as="span" sx={{ fontSize: [4, 3], marginX: 2 }}>
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
              </Styled.li>
            );
          })}
        </Styled.ul>
      </Box>
      <Text sx={{ fontSize: 1, fontStyle: 'italic' }}>
        * I know, it's very sad, but Instagram is the only social media that I
        don't have <strong>arantespp</strong> as username. Sometime ago I've
        create the account with that username but I couldn't remember the
        password, the email or even if I've deleted the account or not.
      </Text>
    </>
  );
};

export default Contact;
