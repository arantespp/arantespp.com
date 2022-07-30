import { Box, Flex, Message, Text } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { pascalCase } from 'change-case';
import Link from './Link';
import Tag from './Tag';

const PostResume = ({ post }: { post: Recommendation }) => {
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
        <Text>{pascalCase(newGroup)},</Text>
      </Link>
      <Text as="span" sx={{ color: 'gray', fontSize: [0, 1] }}>
        {' '}
        {formattedDate}
      </Text>
      {readingTime > 1 && (
        <Box>
          <Text sx={{ color: 'lightGray', fontSize: [0, 1] }}>
            Reading time: {readingTime} minutes
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default PostResume;
