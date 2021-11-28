import {
  faDev,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faMedium,
  faReddit,
  faStackOverflow,
  faTelegramPlane,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faChessPawn, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const socialMedias = {
  Twitter: {
    href: 'https://twitter.com/arantespp',
    faIcon: faTwitter,
    username: '@arantespp',
  },
  Email: {
    href: 'mailto:pedro@arantespp.com',
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
  Medium: {
    href: 'https://medium.com/@arantespp',
    faIcon: faMedium,
  },
  Reddit: {
    href: 'https://www.reddit.com/user/arantespp',
    faIcon: faReddit,
  },
  'chess.com': {
    href: 'https://www.chess.com/member/arantespp',
    faIcon: faChessPawn,
  },
};

export const socialMediasArr = Object.entries(socialMedias).map(
  ([name, value]) => ({ name, ...value }),
);
