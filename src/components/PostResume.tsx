import { Box, Flex, Message, Text } from 'theme-ui';
import { NetworkLink } from './NetworkLink';
import { Recommendation } from '../../lib/files';
import { pascalCase } from 'change-case';
import Link from './Link';
import Tag from './Tag';

export const PostResume = ({
  post,
  isPostPage,
}: {
  post: Recommendation;
  isPostPage?: boolean;
}) => {
  const { excerpt, group, formattedDate, tags, href, readingTime } = post;

  const newGroup = group === 'zettel' ? 'zettelkasten' : group;

  const displayReadingTime = readingTime > 1 && isPostPage;

  return (
    <Box sx={{ color: 'text' }}>
      <Link
        href={href}
        sx={{
          textDecoration: 'none',
          ':hover': {
            color: 'lightGray',
          },
        }}
      >
        <Message variant="excerpt" sx={{ cursor: 'pointer' }}>
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
        <Text
          as="span"
          sx={{
            color: 'gray',
            fontSize: [0, 1],
            marginY: 1,
            display: 'block',
          }}
        >
          <Link href={`/${newGroup}`}>{pascalCase(newGroup)},</Link>{' '}
          {formattedDate}.
        </Text>
      )}
      {isPostPage && (
        <Flex
          sx={{
            justifyContent: displayReadingTime ? 'space-between' : 'flex-end',
            width: '100%',
            color: 'lightGray',
            fontSize: [0, 1],
          }}
        >
          {displayReadingTime && (
            <Text>Reading time: {readingTime} minutes</Text>
          )}
          <NetworkLink nodeId={post.href} />
        </Flex>
      )}
    </Box>
  );
};
