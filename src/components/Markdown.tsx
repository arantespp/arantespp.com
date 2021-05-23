import { paramCase } from 'change-case';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Box, Flex, Link, Message, Themed } from 'theme-ui';
import url from 'url';

import 'katex/dist/katex.min.css';

const CustomImage = dynamic(() => import('./CustomImage'));

const componentsByLevel = [
  Themed.h1,
  Themed.h2,
  Themed.h3,
  Themed.h4,
  Themed.h5,
  Themed.h6,
];

const Heading = ({
  children = [],
  level,
  noH1,
}: {
  children: React.ReactNode[];
  level: number;
  noH1: boolean;
}) => {
  const { asPath } = useRouter();
  const { pathname } = url.parse(asPath);

  /**
   * Solves the problem when there is only "#" without text on .md files.
   */
  if (children.length === 0) {
    return null;
  }

  const hash = paramCase(children[0] as any);
  const href = `${pathname}#${hash}`;

  const ResolvedComponent = componentsByLevel[level - 1];

  /**
   * Title will be shown at PostHeader component.
   */
  const hiddenH1 = level === 1 && noH1;

  return (
    <ResolvedComponent id={hash} hidden={hiddenH1}>
      {level === 1 ? (
        children
      ) : (
        <NextLink href={href}>
          <Link
            sx={{
              cursor: 'pointer',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </Link>
        </NextLink>
      )}
    </ResolvedComponent>
  );
};

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const components = ({ noH1 = true }: { noH1?: boolean } = {}): {
  [nodeType: string]: React.ElementType;
} => ({
  ...(Themed as any),
  h1: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  h2: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  h3: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  h4: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  h5: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  h6: ({ children, level }: { children: React.ReactNode[]; level: number }) => (
    <Heading {...{ children, level, noH1 }} />
  ),
  link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const link = <Link href={href}>{children}</Link>;

    if (href.startsWith('/')) {
      return (
        <NextLink href={href} passHref>
          {link}
        </NextLink>
      );
    }

    return link;
  },
  blockquote: ({ children }: { children: React.ReactNode }) => {
    return (
      <Box sx={{ marginY: 4 }}>
        <Message
          variant="quote"
          sx={{
            p: {
              marginY: 0,
            },
          }}
        >
          {Array.isArray(children)
            ? children.map((child, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={index}>{child}</React.Fragment>
              ))
            : children}
        </Message>
      </Box>
    );
  },
  /**
   * https://github.com/remarkjs/react-markdown/issues/93#issuecomment-399497496
   */
  p: ({ children }) => {
    if (
      children &&
      children[0] &&
      children.length === 1 &&
      children[0].props &&
      children[0].props.src
    ) {
      return children;
    }

    return <Themed.p>{children}</Themed.p>;
  },
  listItem: Themed.li,
  list: ({ ordered, ...props }: any) => {
    if (ordered) {
      return <Themed.ol {...props} />;
    }
    return <Themed.ul {...props} />;
  },
  img: ({ src, alt }) => (
    <Box sx={{ marginY: 5 }}>
      <CustomImage {...{ src, alt }} />
    </Box>
  ),
  html: ({ value }: { value: string }) => {
    const justifyContent = value.includes('class="twitter-tweet"')
      ? 'center'
      : 'flex-start';

    return (
      <Flex
        sx={{ justifyContent, marginBottom: 3 }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  },
});

const Markdown = ({ content, noH1 }: { content: string; noH1?: boolean }) => {
  return (
    <ReactMarkdown
      components={components({ noH1 })}
      /**
       * https://katex.org/docs/supported.html
       * https://github.com/remarkjs/remark-math
       */
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
