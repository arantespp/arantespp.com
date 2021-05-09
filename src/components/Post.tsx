import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Image, Link, Themed } from 'theme-ui';

import type { Post } from '../lib/files';

import BookHeader from './BookHeader';
import CustomImage from './CustomImage';
import KeywordsHead from './KeywordsHead';
import Markdown from './Markdown';
import NetworkLink from './NetworkLink';
import PostHeaders from './PostHeaders';
import PostResume from './PostResume';
import SharePost from './SharePost';

const PostComponent = ({ post }: { post: Post }) => {
  const { image, title, book, editLink, href, tags } = post;

  return (
    <>
      <PostHeaders post={post} />
      <KeywordsHead keywords={tags} />
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
        <Image sx={{ height: '1.5em', marginLeft: 1 }} src="/rose.png" />
      </Flex>
      <SharePost post={post} />
    </>
  );
};

export default PostComponent;
