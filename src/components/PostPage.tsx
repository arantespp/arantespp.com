import * as React from 'react';
import { Box, Themed } from 'theme-ui';
import { Draft, Post, Recommendation } from '../../lib/files';
import { NextSeo, NextSeoProps } from 'next-seo';
import { editPost } from '../../shortcuts';
import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';
import { useRouter } from 'next/router';
import PostFooter from './PostFooter';
import PostResume from './PostResume';
import dynamic from 'next/dynamic';

const BookHeader = dynamic(() => import('./BookHeader'));

const Markdown = dynamic(() => import('./Markdown'), {
  ssr: false,
  suspense: true,
});

const Recommendations = dynamic(() => import('./Recommendations'));

const SimplyContent = ({ content }: { content: string }) => {
  return (
    <Box
      sx={{
        whiteSpace: 'pre-line',
      }}
    >
      {content}
    </Box>
  );
};

export type PostPageProps = {
  seo?: NextSeoProps;
  recommendations?: Recommendation[];
} & ({ post: Post | Draft } | { content: string });

export const PostPage = ({
  seo,
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

  const newSeo = React.useMemo(() => {
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

      return {
        title,
        description: excerpt,
        openGraph: {
          url: 'https://arantespp.com' + href,
          ...(book && isBook
            ? {
                images: book.image
                  ? [
                      {
                        url: book.image,
                        alt: title,
                      },
                    ]
                  : undefined,
                book: {
                  authors: book?.authors,
                  tags,
                  isbn: book?.ISBN || book?.ASIN,
                },
              }
            : {
                article: {
                  publishedTime: createdAt,
                  modifiedTime: updatedAt,
                  authors: ['https://arantespp.com/me'],
                  tags,
                },
              }),
        },
        ...seo,
      };
    }

    return seo;
  }, [postOrContent, seo, isBook]);

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
      <React.Suspense fallback={<SimplyContent content={newContent} />}>
        <Box as="article">
          <Markdown content={newContent} noH1={isPost} />
        </Box>
      </React.Suspense>
      {isPost && <PostFooter post={postOrContent.post} />}
      {recommendations && <Recommendations recommendations={recommendations} />}
    </>
  );
};
