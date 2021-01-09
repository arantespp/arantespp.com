import {
  faDev,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faReddit,
  faStackOverflow,
  faTelegramPlane,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const socialMedias = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/arantespp',
    faIcon: faTwitter,
  },
  {
    name: 'Email',
    href: 'mailto:arantespp@gmail.com',
    faIcon: faEnvelope,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/arantespp',
    faIcon: faTelegramPlane,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/arantespp_',
    faIcon: faInstagram,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/arantespp',
    faIcon: faFacebookSquare,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/arantespp',
    faIcon: faLinkedinIn,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/arantespp',
    faIcon: faGithub,
  },
  {
    name: 'Dev.to',
    href: 'https://dev.to/arantespp',
    faIcon: faDev,
  },
  {
    name: 'StackOverflow',
    href: 'https://stackoverflow.com/users/8786986/pedro-arantes',
    faIcon: faStackOverflow,
  },
  {
    name: 'Reddit',
    href: 'https://www.reddit.com/user/arantespp',
    faIcon: faReddit,
  },
] as const;
