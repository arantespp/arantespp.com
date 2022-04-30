import { Box, Flex, Message, Text } from 'theme-ui';
import { pascalCase } from 'change-case';

import type { PostWithoutContent } from '../../lib/files';

import Link from './Link';
import Tag from './Tag';

const PostResume = ({ post }: { post: PostWithoutContent }) => {
  const { excerpt, group, formattedDate, tags, href, readingTime } = post;

  const newGroup = group === 'zettel' ? 'zettelkasten' : group;

  return (
    <Box
      sx={{
        color: 'text',
        paddingBottom: 2,
      }}
    >
      <Link href={href} sx={{ textDecoration: 'none' }}>
        <Message variant="excerpt" sx={{ cursor: 'pointer' }}>
          {excerpt}
        </Message>
      </Link>
      <Flex sx={{ flexWrap: 'wrap', marginY: 1 }}>
        {tags.map((tag) => (
          <Box key={tag} sx={{ paddingRight: 3 }}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
      <Link href={`/${newGroup}`}>
        <Text sx={{ fontSize: 2 }}>{pascalCase(newGroup)},</Text>
      </Link>
      <Text as="span" sx={{ color: 'gray', fontSize: 1 }}>
        {' '}
        {formattedDate}
      </Text>
      {readingTime > 1 && (
        <Box>
          <Text sx={{ color: 'lightGray', fontSize: 1 }}>
            Reading time: {readingTime} minutes
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default PostResume;
