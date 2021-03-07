import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { Box, Flex, Image, Link, Styled } from 'theme-ui';

import type { Post } from '../lib/files';

import CustomImage from './CustomImage';
import Markdown from './Markdown';
import PostResume from './PostResume';

const PostComponent = ({ post }: { post: Post }) => {
  const { excerpt, image, href, title, group } = post;

  const editLink = `https://github.com/arantespp/arantespp.com/edit/main/posts/${href}.md`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:url"
          key="og:url"
          content={`https://arantespp.com${href}`}
        />
        <meta property="og:title" key="og:title" content={title} />
        <meta
          property="og:description"
          key="og:description"
          content={excerpt}
        />
        {group === 'zettelkasten' && (
          <meta
            property="og:image"
            key="og:image"
            content="https://source.unsplash.com/HOrhCnQsxnQ"
          />
        )}
        {image && (
          <meta property="og:image" key="og:image" content={image.url} />
        )}
      </Head>
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
      <Flex sx={{ width: '100%', justifyContent: 'flex-end' }}>
        <Link
          sx={{
            fontSize: 1,
            color: 'gray',
            fontStyle: 'italic',
          }}
          href={editLink}
        >
          <span>Edit this post </span>
          <FontAwesomeIcon icon={faPen} />
        </Link>
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
