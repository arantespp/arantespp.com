import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { socialMedias } from '../lib/socialMedias';

const Me = () => {
  return (
    <>
      <h1>Me</h1>
      <div className="flex flex-col items-center m-4">
        <img
          className="max-w-full"
          style={{ margin: 0 }}
          src="me.jpg"
          alt="My best picture"
          width="400px"
        />
        <caption className="text-normal">My current best photo.</caption>
      </div>
      <h3>Hello there!</h3>
      <p>
        Thanks for stopping by. I hope you liked some posts I wrote here.
        Currently I'm a software developer, but probably you won't find any post
        about tech here. I use this blog as a online note of the subjects I
        study about, as psychology, mind, brain or even web design.
      </p>
      <p>
        I use the <Link href="/zettelkasten">Zettelkasten</Link> method to
        improve the way a learn some topic, so you can find tons of notes about
        several subjects. Also, I write some{' '}
        <Link href="/zettelkasten">essays</Link>, which are posts I express my
        opinion about some theme.
      </p>
      <p>
        This blog is under construction, I have many ideas to write and design
        to improve, but I'm really enjoying this journey.
      </p>
      <p>
        By any reason, if you want to contact me, you can find me in any social
        media by the username <strong>arantespp</strong>*.
      </p>
      <ul>
        {socialMedias.map(({ name, href, faIcon }) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="text-xl mr-3" icon={faIcon} />
              {href}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm">
        * I know, it's very sad, but Instagram is the only social media that I
        don't have <strong>arantespp</strong> as username. Sometime ago I've
        create the account with that username but I couldn't remember the
        password, the email or even if I've deleted the account or not.
      </p>
    </>
  );
};

export default Me;
