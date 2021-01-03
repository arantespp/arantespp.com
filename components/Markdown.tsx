import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { Box, Link, Styled, Text } from 'theme-ui';

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const renderers = ({ noH1 = true }: { noH1?: boolean } = {}) => ({
  heading: ({
    level,
    children,
  }: {
    level: number;
    children: React.ReactNode;
  }) => {
    const componentsByLevel = [
      Styled.h1,
      Styled.h2,
      Styled.h3,
      Styled.h4,
      Styled.h5,
      Styled.h6,
    ];
    /**
     * Title will be shown at PostHeader component.
     */
    const hiddenH1 = level === 1 && noH1;
    const ResolvedComponent = componentsByLevel[level - 1];
    return <ResolvedComponent hidden={hiddenH1}>{children}</ResolvedComponent>;
  },
  link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { asPath, pathname } = useRouter();

    if (href.startsWith('.')) {
      const newPath = path.join(asPath, '..', href).replace(/\.md$/, '');
      return (
        <NextLink as={newPath} href={pathname} passHref>
          <Link>{children}</Link>
        </NextLink>
      );
    }

    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  },
  root: Styled.root,
  paragraph: Styled.p,
  strong: Styled.strong,
  listItem: Styled.li,
  list: ({ ordered, ...props }) => {
    if (ordered) {
      return <Styled.ol {...props} />;
    }
    return <Styled.ul {...props} />;
  },
  inlineCode: ({ ...props }) => {
    return <Text as="span" variant="highlighted" {...props} />;
  },
  image: ({ src, alt }) => {
    return <Image src={src} alt={alt} width={1000} height={500} />;
  },
});

const Markdown = ({ content, noH1 }: { content: string; noH1?: boolean }) => {
  return <ReactMarkdown renderers={renderers({ noH1 })} children={content} />;
};

export default Markdown;
