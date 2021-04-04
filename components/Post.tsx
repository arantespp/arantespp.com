import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Image, Link, Themed } from 'theme-ui';

import type { Post } from '../lib/files';

import BookHeader from './BookHeader';
import CustomImage from './CustomImage';
import Markdown from './Markdown';
import NetworkLink from './NetworkLink';
import PostHead from './PostHead';
import PostResume from './PostResume';

const PostComponent = ({ post }: { post: Post }) => {
  const { image, title, book, editLink, href } = post;

  return (
    <>
      <PostHead post={post} />
      <Themed.h1>{title}</Themed.h1>
      <Box
        sx={{
          marginBottom: 4,
          borderWidth: 1,
          borderColor: 'muted',
          borderBottomStyle: 'solid',
        }}
      >
        <PostResume {...post} />
      </Box>
      <Box sx={{ marginBottom: 5 }}>
        {!!image && <CustomImage {...image} src={`${image.url}/1024×576`} />}
        {!!book && <BookHeader {...book} />}
      </Box>
      <Markdown content={post.content} />
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          marginY: 4,
          fontSize: 1,
        }}
      >
        <NetworkLink nodeId={href} />
        {editLink && (
          <Link sx={{ color: 'gray', fontStyle: 'italic' }} href={editLink}>
            <span>Recommend an edition for this post </span>
            <FontAwesomeIcon icon={faPen} />
          </Link>
        )}
      </Flex>
      <Flex sx={{ justifyContent: 'center', marginTop: 5, marginBottom: 6 }}>
        <Image sx={{ height: '1.5em', marginLeft: 1 }} src="/rose.png" />
      </Flex>
      {/* <Text
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 4,
          marginBottom: 5,
          marginTop: 4,
        }}
      >
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faTwitter} />
      </Text> */}
    </>
  );
};

export default PostComponent;
