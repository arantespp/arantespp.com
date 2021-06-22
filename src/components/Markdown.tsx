/* eslint-disable @typescript-eslint/no-explicit-any */
import { paramCase } from 'change-case';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown/src/ast-to-react';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Box, Link, Message, Themed } from 'theme-ui';
import url from 'url';

import Tweet from './Tweet';

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

const HeadingLink = ({
  children,
  level,
  noH1,
  id,
  href,
}: {
  children: React.ReactNode[];
  level: number;
  noH1: boolean;
  id?: string;
  href: string;
}) => {
  const ResolvedComponent = componentsByLevel[level - 1];

  /**
   * Title will be shown at PostHeader component.
   */
  const hiddenH1 = level === 1 && noH1;

  return (
    <ResolvedComponent id={id} hidden={hiddenH1}>
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

  /**
   * Solves the problem when there is only "#" without text on .md files.
   */
  if (children.length === 0) {
    return null;
  }

  /**
   * It can be an object because some heading may be pointing to a
   * specific URL.
   *
   * ```
   * ### [All][/all]
   * ```
   */
  if (typeof children[0] === 'object') {
    const props = (children?.[0] as any)?.props;

    if (props.children) {
      return (
        <HeadingLink href={props.href || '/'} level={level} noH1={noH1}>
          {props.children}
        </HeadingLink>
      );
    }

    return null;
  }

  const { pathname } = url.parse(asPath);
  const hash = paramCase(children[0] as any);
  const href = `${pathname}#${hash}`;

  return (
    <HeadingLink id={hash} href={href} level={level} noH1={noH1}>
      {children}
    </HeadingLink>
  );
};

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const getComponents = ({
  noH1 = true,
}: { noH1?: boolean } = {}): Components => ({
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
  blockquote: ({ children }) => {
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
    if (Tweet.isTweet(children)) {
      return <Tweet>{children}</Tweet>;
    }

    if (
      children &&
      children[0] &&
      children.length === 1 &&
      (children[0] as any).props &&
      (children[0] as any).props.src
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
  img: ({ src, alt }: any) => (
    <Box sx={{ marginY: 5 }}>
      <CustomImage {...{ src, alt }} />
    </Box>
  ),
});

const Markdown = ({
  content,
  components,
  noH1,
}: {
  content: string;
  components?: Components;
  noH1?: boolean;
}) => {
  return (
    <ReactMarkdown
      components={{ ...getComponents({ noH1 }), ...components }}
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
