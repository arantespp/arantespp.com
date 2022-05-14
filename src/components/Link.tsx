import { LinkProps, Link as LinkUi } from 'theme-ui';
import NextLink from 'next/link';

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  const { href } = props;

  if (!href) {
    return null;
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <NextLink href={href} passHref>
        <LinkUi aria-label={props.href} {...props}>
          {children}
        </LinkUi>
      </NextLink>
    );
  }

  return (
    <LinkUi
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.href}
      {...props}
    >
      {children}
    </LinkUi>
  );
};

export default Link;
