import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { Flex, Image, Link, Styled, Text } from 'theme-ui';

import { socialMedias } from '../lib/socialMedias';

const Me = () => {
  return (
    <>
      <Styled.h1>Me</Styled.h1>
      <Flex
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 2,
        }}
      >
        <Image
          src="me.jpg"
          alt="My best picture"
          sx={{
            maxWidth: '400px',
            width: '90vw',
          }}
        />
        <Text sx={{ fontSize: 1 }}>My current best photo.</Text>
      </Flex>
      <Styled.h3>Hello there!</Styled.h3>
      <Styled.p>
        Thanks for stopping by. I hope you liked some posts I wrote here.
        Currently I'm a software developer, but probably you won't find any post
        about tech here. I use this blog as a online note of the subjects I
        study about, as psychology, mind, brain or even web design.
      </Styled.p>
      <Styled.p>
        <Text as="span">I use the </Text>
        <NextLink href="/zettelkasten">
          <Link>Zettelkasten</Link>
        </NextLink>
        <Text as="span">
          method to improve the way a learn some topic, so you can find tons of
          notes about several subjects. Also, I write some{' '}
        </Text>
        <NextLink href="/zettelkasten">
          <Link>essays</Link>
        </NextLink>
        <Text as="span">
          , which are posts I express my opinion about some theme.
        </Text>
      </Styled.p>
      <Styled.p>
        This blog is under construction, I have many ideas to write and design
        to improve, but I'm really enjoying this journey.
      </Styled.p>
      <Styled.p>
        <Text>
          By any reason, if you want to contact me, you can find me in any
          social media by the username{' '}
        </Text>
        <strong>arantespp</strong>*.
      </Styled.p>
      <Styled.ul>
        {socialMedias.map(({ name, href, faIcon }) => (
          <Styled.li key={name}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'black' }}
            >
              <FontAwesomeIcon sx={{ marginRight: 3 }} icon={faIcon} />
              {href}
            </Link>
          </Styled.li>
        ))}
      </Styled.ul>
      <Styled.p sx={{ fontSize: 1 }}>
        * I know, it's very sad, but Instagram is the only social media that I
        don't have <strong>arantespp</strong> as username. Sometime ago I've
        create the account with that username but I couldn't remember the
        password, the email or even if I've deleted the account or not.
      </Styled.p>
    </>
  );
};

export default Me;
