import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { Box, Flex, Themed } from 'theme-ui';

import { editPost } from '../../shortcuts';

import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import type { Post } from '../../lib/files';

import BookHeader from './BookHeader';
import NetworkLink from './NetworkLink';
import { PostFooter } from './PostFooter';
import PostResume from './PostResume';
import SharePost from './SharePost';

const Markdown = dynamic(() => import('./Markdown'));

const PostComponent = ({ post }: { post: Post }) => {
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
                  images: [
                    {
                      url: book.image,
                      alt: title,
                    },
                  ],
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
      <Markdown content={post.content} />
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
      <SharePost post={post} />
    </>
  );
};

export default PostComponent;
