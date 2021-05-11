import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Link, Message, Text } from 'theme-ui';

import type { PostWithoutContent } from '../lib/files';

import Tag from './Tag';

const PostResume = ({ post }: { post: PostWithoutContent }) => {
  const { asPath } = useRouter();

  const {
    excerpt,
    group,
    formattedDate,
    updatedAt,
    tags,
    href,
    updateHistory,
    readingTime,
  } = post;

  const isPostPage = asPath === href;

  const updatedAfterCreated = formattedDate !== updatedAt;

  return (
    <Box
      sx={{
        color: 'text',
        paddingBottom: 2,
      }}
    >
      <NextLink href={href} passHref>
        <Message variant="excerpt" sx={{ cursor: 'pointer' }}>
          {excerpt}
        </Message>
      </NextLink>
      <Flex sx={{ flexWrap: 'wrap', marginY: 1 }}>
        {tags.map((tag) => (
          <Box key={tag} sx={{ paddingRight: 3 }}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
      <Text sx={{ fontSize: 1 }}>
        <NextLink href={`/${group}`} passHref>
          <Link sx={{ fontSize: 2, paddingRight: 1 }}>
            {pascalCase(group)},
          </Link>
        </NextLink>
        <Text as="span" sx={{ color: 'gray' }}>
          {formattedDate}
        </Text>
        {isPostPage && updatedAfterCreated && (
          <Text
            as="span"
            sx={{ color: 'gray', fontStyle: 'italic', fontSize: 1 }}
          >
            {' '}
            <Link href={updateHistory}>(updates)</Link>
          </Text>
        )}
      </Text>
      {readingTime > 1 && (
        <Box>
          <Text sx={{ color: 'muted', fontSize: 1 }}>
            Reading time: {readingTime} minutes
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default PostResume;
