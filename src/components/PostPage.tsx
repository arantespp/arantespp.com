import * as React from 'react';
import { Box, Text, Themed } from 'theme-ui';
import { Draft, Post, Recommendation } from '../../lib/files';
import { NextSeo, NextSeoProps } from 'next-seo';
import { editPost } from '../../shortcuts';
import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';
import { useRouter } from 'next/router';
import Markdown from './Markdown';
import PostFooter from './PostFooter';
import PostResume from './PostResume';
import dynamic from 'next/dynamic';

const BookHeader = dynamic(() => import('./BookHeader'));

const Recommendations = dynamic(() => import('./Recommendations'));

export type PostPageProps = {
  seo?: NextSeoProps;
  recommendations?: Recommendation[];
} & ({ post: Post | Draft } | { content: string });

export const PostPage = ({
  seo = {},
  recommendations,
  ...postOrContent
}: PostPageProps) => {
  const contentEditableRef = useContentEditable();

  const isPost = 'post' in postOrContent;

  const isBook =
    isPost && postOrContent.post.book && postOrContent.post.group === 'books';

  const router = useRouter();

  useKeypressSequenceListener(editPost, () => {
    if (isPost) {
      router.push({
        pathname: `/editor`,
        query: {
          group: postOrContent.post.group,
          slug: postOrContent.post.slug,
        },
      });
    }
  });

  const newContent = React.useMemo(() => {
    if ('content' in postOrContent) {
      return postOrContent.content;
    }

    const { post } = postOrContent;

    if ('backlinks' in post) {
      if (post.backlinks.length === 0) {
        return post.content;
      }

      return [
        post.content,
        '## Backlinks',
        ...post.backlinks.map(({ href, title }) => `- [${title}](${href})`),
      ].join('\n');
    }

    return post.content;
  }, [postOrContent]);

  const newSeo: NextSeoProps = (() => {
    if ('post' in postOrContent) {
      const { post } = postOrContent;

      const {
        title,
        book,
        href,
        tags,
        excerpt,
        updatedAt,
        date: createdAt,
      } = post;

      const openGraph: NextSeoProps['openGraph'] = {
        url: 'https://arantespp.com' + href,
        title,
        description: excerpt,
      };

      if (book && isBook) {
        openGraph.type = 'book';

        openGraph.book = {
          authors: book?.authors,
          tags,
          isbn: book?.ISBN || book?.ASIN,
        };

        openGraph.images = [
          {
            url:
              book.image ||
              'https://arantespp.com/images/creators/jess-bailey-X5gDoysLbBc-unsplash.webp',
            alt: title,
          },
        ];
      } else {
        openGraph.type = 'article';

        openGraph.article = {
          publishedTime: createdAt,
          modifiedTime: updatedAt,
          authors: ['Pedro Arantes'],
          tags,
        };

        openGraph.images = [
          {
            url: 'https://arantespp.com/images/creators/david-travis-5bYxXawHOQg-unsplash.webp',
            alt: title,
          },
        ];
      }

      return {
        title,
        description: excerpt,
        openGraph,
        ...seo,
      };
    }

    return seo;
  })();

  return (
    <>
      <NextSeo {...newSeo} />
      {isPost && (
        <Box ref={contentEditableRef}>
          <Themed.h1>{postOrContent.post.title}</Themed.h1>
          <Box
            sx={{
              marginBottom: [5],
              borderWidth: 1,
              borderColor: 'muted',
              borderBottomStyle: 'solid',
            }}
          >
            <PostResume post={postOrContent.post} />
          </Box>
        </Box>
      )}
      {isBook && (
        <Box sx={{ marginBottom: [5] }}>
          <BookHeader book={postOrContent.post.book!} />
        </Box>
      )}
      <Box as="article">
        <Markdown content={newContent} noH1={isPost} />
      </Box>
      {isPost && <PostFooter post={postOrContent.post} />}
      <React.Suspense>
        {recommendations && (
          <Recommendations recommendations={recommendations} />
        )}
      </React.Suspense>
    </>
  );
};
