import { Box, Flex, Image, Styled, Text } from 'theme-ui';

import type { Post } from '../lib/files';

import CustomImage from './CustomImage';
import Markdown from './Markdown';
import PostResume from './PostResume';

const PostComponent = ({ post }: { post: Post }) => {
  const { image, title } = post;

  return (
    <>
      <Styled.h1>{title}</Styled.h1>
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
      {!!image && (
        <Box sx={{ marginBottom: 5 }}>
          <CustomImage {...image} src={`${image.url}/1024×576`} />
        </Box>
      )}
      <Markdown content={post.content} />
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
