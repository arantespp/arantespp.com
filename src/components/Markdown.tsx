/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown/src/ast-to-react';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Box, Flex, Message, Themed } from 'theme-ui';

import { useContentEditable } from '../hooks/useContentEditable';

import Heading from './Heading';
import Link from './Link';
import Tag from './Tag';
import Tweet from './Tweet';

import 'katex/dist/katex.min.css';

const CustomImage = dynamic(() => import('./CustomImage'));

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
  a: ({ children, href }) => {
    if (href && href.startsWith('/tags/')) {
      const [, , tag] = href.split('/');
      return <Tag tag={tag} />;
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
    <Box ref={ref}>
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
