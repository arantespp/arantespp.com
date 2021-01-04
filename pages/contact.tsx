import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';

import { Box, Styled, Text } from 'theme-ui';

import { socialMedias } from '../lib/socialMedias';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Styled.h1>Contact</Styled.h1>
      <Styled.p>
        If you want to contact me by any reason, you can find me at almost
        social media by the username <strong>arantespp</strong>*.
      </Styled.p>
      <Box sx={{ marginY: 4 }}>
        <Styled.ul>
          {socialMedias.map(({ href, name, faIcon }) => {
            return (
              <Styled.li key={name}>
                <Styled.a href={href} target="_blank" rel="noopener noreferrer">
                  <Text as="span" sx={{ fontSize: 3, marginX: 2 }}>
                    <FontAwesomeIcon icon={faIcon} />
                  </Text>
                  <Text as="span" sx={{ marginLeft: 1 }}>
                    {href}
                  </Text>
                </Styled.a>
              </Styled.li>
            );
          })}
        </Styled.ul>
      </Box>
      <Text sx={{ fontSize: 1 }}>
        * I know, it's very sad, but Instagram is the only social media that I
        don't have <strong>arantespp</strong> as username. Sometime ago I've
        create the account with that username but I couldn't remember the
        password, the email or even if I've deleted the account or not.
      </Text>
    </>
  );
};

export default Contact;
