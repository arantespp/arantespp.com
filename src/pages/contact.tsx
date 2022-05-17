import { Flex, Link, Text, Themed } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextSeo } from 'next-seo';

import { getSocialMediasArr, socialMedias } from '../../lib/socialMedias';

const Contact = () => (
  <>
    <NextSeo
      title="Contact"
      description='You can find me on almost all social media by the username "arantespp".'
    />
    <Themed.h1>Contact</Themed.h1>
    <Themed.p>
      If you want to get in touch with me,{' '}
      <Link
        href={socialMedias.Email.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text as="span">email</Text>
      </Link>{' '}
      and{' '}
      <Link
        href={socialMedias.Twitter.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text as="span">Twitter</Text>
      </Link>{' '}
      are your best channels because I check them more frequently.
    </Themed.p>

    <Themed.p>
      You can find me on almost all social media by the username
      <Themed.strong> arantespp</Themed.strong>*. I don&apos;t use some of them
      often, and I&apos;ve just created to get the username.
    </Themed.p>

    <Flex
      sx={{
        marginY: 4,
        flexDirection: ['row', 'column'],
        justifyContent: ['center'],
        flexWrap: 'wrap',
      }}
    >
      {getSocialMediasArr().map(({ href, faIcon, name }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
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
              minWidth: '30px',
              fontSize: [5, 3],
              marginX: 2,
              textAlign: 'center',
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
      * I know, it&apos;s sad, but Instagram is the only social media that I
      don&apos;t have <Themed.strong>arantespp</Themed.strong> as username. Some
      time ago, I had created the account with that username, but I
      couldn&apos;t remember the password, the email, or even if I&apos;ve
      deleted it or not.
    </Text>
  </>
);

export default Contact;
