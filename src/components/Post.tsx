import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Flex, Themed } from 'theme-ui';

import { editPost } from '../../shortcuts';

import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import type { Post } from '../../lib/files';

import BookHeader from './BookHeader';
import CustomImage from './CustomImage';
import HTMLHeaders from './HTMLHeaders';
import NetworkLink from './NetworkLink';
import { PostFooter } from './PostFooter';
import PostResume from './PostResume';
import SharePost from './SharePost';

const Markdown = dynamic(() => import('./Markdown'));

const PostComponent = ({ post }: { post: Post }) => {
  const ref = useContentEditable();

  const {
    image,
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

  const imageUrl = (() => {
    if (group === 'zettel') {
      return '/images/nonauthor/david-travis-5bYxXawHOQg-unsplash.webp';
    }

    if (image) {
      return image.url;
    }

    if (book?.image) {
      return book.image;
    }

    return '';
  })();

  return (
    <>
      <HTMLHeaders
        title={title}
        description={excerpt}
        url={href}
        keywords={tags}
        image={{ url: imageUrl }}
        createdAt={createdAt}
        updatedAt={updatedAt}
        structuredData
      />
      <Box ref={ref}>
        <Themed.h1>{title}</Themed.h1>
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
        {!!image && <CustomImage alt={image.alt} src={image.url} />}
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
