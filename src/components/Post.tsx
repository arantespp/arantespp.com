import * as React from 'react';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { Box, Flex, Themed } from 'theme-ui';
import { Draft, Post } from '../../lib/files';
import { PostFooter } from './PostFooter';
import { editPost } from '../../shortcuts';
import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';
import { useRouter } from 'next/router';
import BookHeader from './BookHeader';
import NetworkLink from './NetworkLink';
import PostResume from './PostResume';
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('./Markdown'));

const PostComponent = ({ post }: { post: Post | Draft }) => {
  const ref = useContentEditable();

  const {
    title,
    book,
    href,
    tags,
    excerpt,
    group,
    slug,
    updatedAt,
    date: createdAt,
  } = post;

  const router = useRouter();

  useKeypressSequenceListener(editPost, () => {
    router.push({ pathname: `/editor`, query: { group, slug } });
  });

  const isBook = book && group === 'books';

  const isArticle = !isBook;

  const content = React.useMemo(() => {
    if ('backlinks' in post) {
      return [
        post.content,
        '## Backlinks',
        ...post.backlinks.map(({ href, title }) => `- [${title}](${href})`),
      ].join('\n');
    }

    return post.content;
  }, [post]);

  return (
    <>
      <NextSeo
        {...{
          title,
          description: excerpt,
          openGraph: {
            url: 'https://arantespp.com' + href,
            ...(isBook
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
        }}
      />
      <Box ref={ref}>
        <Themed.h1>{title}</Themed.h1>
        {isArticle && (
          <ArticleJsonLd
            {...{
              type: 'Blog',
              url: `https://arantespp.com${href}`,
              description: excerpt,
              title,
              datePublished: createdAt,
              dateModified: updatedAt,
              authorName: 'Pedro Arantes',
              images: [],
            }}
          />
        )}
        <Box
          sx={{
            marginBottom: [4],
            borderWidth: 1,
            borderColor: 'muted',
            borderBottomStyle: 'solid',
          }}
        >
          <PostResume post={post} />
        </Box>
      </Box>
      <Box sx={{ marginBottom: [5] }}>
        {!!book && <BookHeader book={book} />}
      </Box>
      <Markdown content={content} />
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          marginTop: 5,
          marginBottom: 4,
          fontSize: 1,
          textAlign: 'center',
        }}
      >
        <NetworkLink nodeId={href} />
      </Flex>
      <PostFooter />
    </>
  );
};

export default PostComponent;
