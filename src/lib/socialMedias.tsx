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

export const socialMedias = {
  Twitter: {
    href: 'https://twitter.com/arantespp',
    faIcon: faTwitter,
    username: '@arantespp',
  },
  Email: {
    href: 'mailto:arantespp@gmail.com',
    faIcon: faEnvelope,
  },
  Telegram: {
    href: 'https://t.me/arantespp',
    faIcon: faTelegramPlane,
  },
  Instagram: {
    href: 'https://instagram.com/arantespp_',
    faIcon: faInstagram,
  },
  Facebook: {
    href: 'https://facebook.com/arantespp',
    faIcon: faFacebookSquare,
  },
  LinkedIn: {
    href: 'https://linkedin.com/in/arantespp',
    faIcon: faLinkedinIn,
  },
  GitHub: {
    href: 'https://github.com/arantespp',
    faIcon: faGithub,
  },
  'Dev.to': {
    href: 'https://dev.to/arantespp',
    faIcon: faDev,
  },
  StackOverflow: {
    href: 'https://stackoverflow.com/users/8786986/pedro-arantes',
    faIcon: faStackOverflow,
  },
  Reddit: {
    href: 'https://www.reddit.com/user/arantespp',
    faIcon: faReddit,
  },
};

export const socialMediasArr = Object.entries(
  socialMedias,
).map(([name, value]) => ({ name, ...value }));
