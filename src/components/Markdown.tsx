import * as React from 'react';
import { Box, Flex, Message, Themed } from 'theme-ui';
import ReactMarkdown, { Components } from 'react-markdown';
import dynamic from 'next/dynamic';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { useContentEditable } from '../hooks/useContentEditable';

import { isTweet } from './Tweet';
import Heading from './Heading';
import Link from './Link';
import Tag from './Tag';

import 'katex/dist/katex.min.css';

const CustomImage = dynamic(() => import('./CustomImage'));
const Tweet = dynamic(() => import('./Tweet'));

/**
 * https://github.com/remarkjs/react-markdown/tree/main#appendix-b-components
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
  a: ({ children, href }) => {
    if (href && href.startsWith('/tags/')) {
      const [, , tag] = href.split('/');
      return <Tag tag={tag} />;
    }

    if (href && isTweet(href)) {
      /**
       * This case means that the link is a reference for another text. For
       * example, [Some text](https://twitter...) is a link whose text is "Some
       * Text" linked to the tweet. In this case, we don't want to render the
       * tweet card. Also, `children[0]` === "Some Text".
       */
      if (children[0] === href) {
        return <Tweet href={href} />;
      }
    }

    return <Link href={href}>{children}</Link>;
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
    if (
      children &&
      children[0] &&
      children.length === 1 &&
      (children[0] as any).props
    ) {
      /**
       * For example:
       * - src: ???
       * - href: Twitter URL.
       */
      const { src, href } = (children[0] as any).props;
      if (src || href) return children;
    }

    return <Themed.p>{children}</Themed.p>;
  },
  img: ({ src, alt }: any) => (
    <Box sx={{ marginY: 4 }}>
      <CustomImage {...{ src, alt }} />
    </Box>
  ),
  table: ({ children }) => {
    return (
      <Flex sx={{ justifyContent: 'center', overflowX: 'auto', marginY: 4 }}>
        <Themed.table>{children}</Themed.table>
      </Flex>
    );
  },
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
  const ref = useContentEditable();

  return (
    <Box ref={ref} as="article">
      <ReactMarkdown
        components={{ ...getComponents({ noH1 }), ...components }}
        /**
         * https://katex.org/docs/supported.html
         * https://github.com/remarkjs/remark-math
         */
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default Markdown;
