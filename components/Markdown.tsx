import Tex from '@matejmazur/react-katex';
import { paramCase } from 'change-case';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import math from 'remark-math';
import { Box, Flex, Link, Styled, Text } from 'theme-ui';
import url from 'url';
import 'katex/dist/katex.min.css';

import CustomImage from './CustomImage';

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
    const { asPath } = useRouter();
    const { pathname } = url.parse(asPath);
    const hash = paramCase((children as any)?.[0].props?.value);
    const href = `${pathname}#${hash}`;

    const componentsByLevel = [
      Styled.h1,
      Styled.h2,
      Styled.h3,
      Styled.h4,
      Styled.h5,
      Styled.h6,
    ];
    const ResolvedComponent = componentsByLevel[level - 1];

    /**
     * Title will be shown at PostHeader component.
     */
    const hiddenH1 = level === 1 && noH1;

    return (
      <ResolvedComponent id={hash} hidden={hiddenH1}>
        <NextLink href={href}>
          <Link
            sx={{
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </Link>
        </NextLink>
      </ResolvedComponent>
    );
  },
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
    return <CustomImage {...{ src, alt }} />;
  },
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
  /**
   * https://katex.org/docs/supported.html
   */
  inlineMath: ({ value }) => <Tex math={value} />,
  math: ({ value }) => (
    <Box sx={{ overflow: 'auto', marginY: 4 }}>
      <Tex block math={value} />
    </Box>
  ),
});

const plugins = [math];

const Markdown = ({ content, noH1 }: { content: string; noH1?: boolean }) => {
  return (
    <ReactMarkdown
      renderers={renderers({ noH1 })}
      plugins={plugins}
      children={content}
    />
  );
};

export default Markdown;
