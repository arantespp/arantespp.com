import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';

import { socialMedias } from '../lib/socialMedias';

const Paragraph: React.FC = ({ children }) => {
  return (
    <Typography variant="body1" component="p">
      {children}
    </Typography>
  );
};

const Me = () => {
  return (
    <>
      <Typography variant="h1">Me</Typography>
      <Box margin={3} display="flex" flexDirection="column" alignItems="center">
        <img src="me.jpg" alt="My best picture" height="400px" />
        <Typography variant="caption">My current best photo.</Typography>
      </Box>
      <Typography variant="h5">Hello there!</Typography>
      <Paragraph>
        Thanks for stopping by. I hope you liked some posts I wrote here.
        Currently I'm a software developer, but probably you won't find any post
        about tech here. I use this blog as a online note of the subjects I
        study about, as psychology, mind, brain or even web design.
      </Paragraph>
      <Paragraph>
        I use the <Link href="/zettelkasten">Zettelkasten</Link> method to
        improve the way a learn some topic, so you can find tons of notes about
        several subjects. Also, I write some{' '}
        <Link href="/zettelkasten">essays</Link>, which are posts I express my
        opinion about some theme.
      </Paragraph>
      <Paragraph>
        This blog is under construction, I have many ideas to write and design
        to improve, but I'm really enjoying this journey.
      </Paragraph>
      <Paragraph>
        By any reason, if you want to contact me, you can find me in any social
        media by the username <strong>arantespp</strong>*.
      </Paragraph>
      <ul>
        {socialMedias.map(({ name, href, Icon }) => (
          <Typography
            key={name}
            component="li"
            variant="body1"
            style={{ margin: 0 }}
          >
            <Icon style={{ position: 'relative', top: '5' }} /> {name}:{' '}
            <a href={href} target="_blank" rel="noopener noreferrer">
              {href}
            </a>
          </Typography>
        ))}
      </ul>
      <Typography variant="body2">
        * I know, it's very sad, but Instagram is the only social media that I
        don't have <strong>arantespp</strong> as username. Sometime ago I've
        create the account with that username but I couldn't remember the
        password, the email or even if I've deleted the account or not.
      </Typography>
    </>
  );
};

export default Me;
