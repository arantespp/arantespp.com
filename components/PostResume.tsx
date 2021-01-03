import { pascalCase } from 'change-case';
import * as dateFns from 'date-fns';
import NextLink from 'next/link';
import { Box, Flex, Link, Message, Text } from 'theme-ui';

import type { Recommendation } from '../lib/files';

import Tag from './Tag';

const getDate = (date: string) => {
  /**
   * https://stackoverflow.com/a/52352512/8786986
   */
  const dt = new Date(date);
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
  );
  return dateFns.format(dtDateOnly, 'MMMM dd, yyyy');
};

const PostResume = ({ excerpt, group, date, tags }: Recommendation) => {
  return (
    <Box
      sx={{
        color: 'black',
        paddingBottom: 2,
      }}
    >
      <Message variant="quote">{excerpt}</Message>
      <Flex sx={{ flexWrap: 'wrap', marginY: 1 }}>
        {tags.map((tag) => (
          <Box key={tag} sx={{ paddingRight: 3 }}>
            <Tag tag={tag} />
          </Box>
        ))}
      </Flex>
      <Text sx={{ fontSize: 1 }}>
        <NextLink href={`/${group}`} passHref>
          <Link sx={{ fontSize: 1, paddingRight: 1, textDecoration: 'none' }}>
            {pascalCase(group)}.
          </Link>
        </NextLink>
        <Text as="span" sx={{ color: 'gray' }}>
          {getDate(date)}
        </Text>
      </Text>
    </Box>
  );
};

export default PostResume;
