import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Telegram,
  Twitter,
} from '@material-ui/icons';

export const socialMedias: Array<{
  name: string;
  href: string;
  Icon: typeof Facebook;
}> = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/arantespp',
    Icon: Twitter,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/arantespp',
    Icon: Telegram,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/arantespp_',
    Icon: Instagram,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/arantespp',
    Icon: Facebook,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/arantespp',
    Icon: LinkedIn,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/arantespp',
    Icon: GitHub,
  },
];
