import * as React from 'react';
import {
  ArticleJsonLd,
  ArticleJsonLdProps,
  BreadCrumbJsonLdProps,
  BreadcrumbJsonLd,
  NextSeo,
  NextSeoProps,
} from 'next-seo';
import { Box, Flex, Text, Themed } from 'theme-ui';
import { Draft, Group, Post, Recommendation } from '../../lib/files';
import { PostFooter } from './PostFooter';
import { PostResume } from './PostResume';
import { editPost } from '../../shortcuts';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';
import { useRouter } from 'next/router';
import Markdown from './Markdown';
import dynamic from 'next/dynamic';

const BookHeader = dynamic(() => import('./BookHeader'));

const Recommendations = dynamic(() => import('./Recommendations'));

const URL = process.env.NEXT_PUBLIC_URL;

const getDefaultImage = (group: Group) => {
  const file: { [key in Group]: string } = {
    blog: `${URL}/images/creators/aaron-burden-CKlHKtCJZKk-unsplash.webp`,
    books: `${URL}/images/creators/jess-bailey-X5gDoysLbBc-unsplash.webp`,
    zettel: `${URL}/images/creators/david-travis-5bYxXawHOQg-unsplash.webp`,
  };

  return file[group];
};

const JsonLd = ({ post }: { post: Post | Draft }) => {
  const { group, href, excerpt, title, date: createdAt } = post;

  const articleJsonLd: ArticleJsonLdProps = {
    url: URL + href,
    title,
    description: excerpt,
    images: [getDefaultImage(group)],
    datePublished: createdAt,
    authorName: ['Pedro Arantes'],
    publisherName: 'Pedro Arantes',
    publisherLogo: URL + '/images/logo.jpg',
  };

  const breadcrumbJsonLd: BreadCrumbJsonLdProps = {
    itemListElements: [
      {
        position: 1,
        name: group === 'zettel' ? 'zettelkasten' : group,
        item: URL + group === 'zettel' ? 'zettelkasten' : group,
      },
      {
        position: 2,
        name: 'Article',
        item: URL + href,
      },
    ],
  };

  return (
    <>
      <ArticleJsonLd {...articleJsonLd} />
      <BreadcrumbJsonLd {...breadcrumbJsonLd} />
    </>
  );
};

export type PostPageProps = {
  seo?: NextSeoProps;
  recommendations?: Recommendation[];
} & ({ post: Post | Draft } | { content: string });

export const PostPage = ({
  seo = {},
  recommendations,
  ...postOrContent
}: PostPageProps) => {
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

      const { title, book, href, tags, excerpt, date: createdAt } = post;

      const openGraph: NextSeoProps['openGraph'] = {
        url: URL + href,
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
            url: book.image || getDefaultImage('books'),
            alt: title,
          },
        ];
      } else {
        openGraph.type = 'article';

        openGraph.article = {
          publishedTime: createdAt,
          authors: ['Pedro Arantes'],
          tags,
        };

        openGraph.images = [
          {
            url: getDefaultImage(post.group),
            alt: title,
          },
        ];
      }

      return {
        title,
        description: excerpt,
        openGraph,
        additionalMetaTags: [
          {
            property: 'keywords',
            content: [post.group, ...tags].join(', ').replaceAll('-', ' '),
          },
        ],
        ...seo,
      };
    }

    return seo;
  })();

  return (
    <>
      <NextSeo {...newSeo} />
      {isPost && <JsonLd post={postOrContent.post} />}
      {isPost && (
        <Box>
          <Themed.h1>{postOrContent.post.title}</Themed.h1>
          <Box
            sx={{
              paddingBottom: 3,
              marginBottom: [5],
              borderWidth: 1,
              borderColor: 'muted',
              borderBottomStyle: 'solid',
            }}
          >
            <PostResume post={postOrContent.post} isPostPage />
          </Box>
        </Box>
      )}
      {isPost && postOrContent.post.draft && (
        <Flex
          sx={{
            marginY: 5,
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: 6,
              fontStyle: 'italic',
              color: 'gray',
            }}
          >
            This post is still a draft!
          </Text>
        </Flex>
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
      <Box sx={{ paddingY: 5 }} />
      {recommendations && <Recommendations recommendations={recommendations} />}
    </>
  );
};
