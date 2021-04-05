import { paramCase } from 'change-case';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import math from 'remark-math';
import { Box, Flex, Link, Message, Themed, Text } from 'theme-ui';
import url from 'url';

const CustomImage = dynamic(() => import('./CustomImage'));
const ReactMarkdown = dynamic(() => import('react-markdown'));
const Tex = dynamic(() => import('./Tex'));

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const renderers = ({ noH1 = true }: { noH1?: boolean } = {}) => ({
  ...(Themed as {}),
  heading: ({
    level,
    children = [],
  }: {
    level: number;
    children: React.ReactNode[];
  }) => {
    const { asPath } = useRouter();
    const { pathname } = url.parse(asPath);

    /**
     * Solves the problem when there is only "#" without text on .md files.
     */
    if (children.length === 0) {
      return null;
    }

    const hash = paramCase((children[0] as any)?.props?.value);
    const href = `${pathname}#${hash}`;

    const componentsByLevel = [
      Themed.h1,
      Themed.h2,
      Themed.h3,
      Themed.h4,
      Themed.h5,
      Themed.h6,
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
          {Array.isArray(children) ? children[0] : children}
        </Message>
      </Box>
    );
  },
  paragraph: Themed.p,
  listItem: Themed.li,
  list: ({ ordered, ...props }) => {
    if (ordered) {
      return <Themed.ol {...props} />;
    }
    return <Themed.ul {...props} />;
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
