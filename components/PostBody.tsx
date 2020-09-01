import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { Link } from 'theme-ui';

import type { PostAndPostsRecommendations } from '../lib/files';

type Post = NonNullable<PostAndPostsRecommendations['post']>;

/**
 * https://github.com/rexxars/react-markdown/tree/c63dccb8185869cfc73c257d098a123ef7a7cd33#node-types
 */
const renderers = {
  link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { asPath, pathname } = useRouter();

    if (href.startsWith('.')) {
      const newPath = path.join(asPath, '..', href).replace(/\.md$/, '');
      return (
        <NextLink as={newPath} href={pathname} passHref>
          <Link as="a">{children}</Link>
        </NextLink>
      );
    }

    return (
      <Link as="a" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  },
};

const PostBody = ({ title, content }: Post) => {
  return (
    <article>
      <Head>
        <title>{title}</title>
      </Head>
      <ReactMarkdown renderers={renderers} source={content} />
    </article>
  );
};

export default PostBody;
