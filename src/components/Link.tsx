import NextLink from 'next/link';
import { Link as LinkUi, LinkProps } from 'theme-ui';

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  const { href } = props;

  if (!href) {
    return null;
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <NextLink href={href} passHref>
        <LinkUi {...props}>{children}</LinkUi>
      </NextLink>
    );
  }

  return (
    <LinkUi target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </LinkUi>
  );
};

export default Link;
