import { Box, Flex, Message, Text } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { pascalCase } from 'change-case';
import Link from './Link';
import Tag from './Tag';

const PostResume = ({
  post,
  isPostPage,
}: {
  post: Recommendation;
  isPostPage?: boolean;
}) => {
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
        <Message
          variant="excerpt"
          sx={{ cursor: 'pointer', marginTop: 3, marginBottom: 1 }}
        >
          {excerpt}
        </Message>
      </Link>
      <Flex sx={{ flexWrap: 'wrap', marginTop: 1 }}>
        {tags.map((tag) => (
          <Box key={tag} sx={{ paddingRight: 3 }}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
      {isPostPage && (
        <Text as="span" sx={{ color: 'gray', fontSize: [0, 1] }}>
          <Link href={`/${newGroup}`}>{pascalCase(newGroup)},</Link>{' '}
          {formattedDate}
        </Text>
      )}
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
