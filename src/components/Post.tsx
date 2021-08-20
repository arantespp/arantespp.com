import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Flex, Image, Link, Themed } from 'theme-ui';

import { useContentEditable } from '../hooks/useContentEditable';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import type { Post } from '../lib/files';

import BookHeader from './BookHeader';
import CustomImage from './CustomImage';
import HTMLHeaders from './HTMLHeaders';
import NetworkLink from './NetworkLink';
import PostResume from './PostResume';
import SharePost from './SharePost';

const Markdown = dynamic(() => import('./Markdown'));

const PostComponent = ({ post }: { post: Post }) => {
  const ref = useContentEditable();

  const { image, title, book, editLink, href, tags, excerpt, group, slug } =
    post;

  const router = useRouter();

  useKeypressSequenceListener('te', () => {
    router.push({ pathname: `/editor`, query: { group, slug } });
  });

  const imageUrl = (() => {
    if (group === 'zettelkasten') {
      return '/images/david-travis-5bYxXawHOQg-unsplash.jpg';
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
        {!!image && (
          <CustomImage alt={image.alt} src={`${image.url}/1024×576`} />
        )}
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
        {editLink && false && (
          <Link sx={{ color: 'gray', fontStyle: 'italic' }} href={editLink}>
            <span>Recommend an edition for this post </span>
            <FontAwesomeIcon icon={faPen} />
          </Link>
        )}
      </Flex>
      <Flex sx={{ justifyContent: 'center', marginTop: 5, marginBottom: 6 }}>
        <Image
          role="button"
          onClick={() => window.scroll({ top: 0, left: 0 })}
          sx={{ height: '1.5em', marginLeft: 1, cursor: 'pointer' }}
          src="/rose.png"
        />
      </Flex>
      <SharePost post={post} />
    </>
  );
};

export default PostComponent;
