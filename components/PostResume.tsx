import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { Box, Flex, Link, Text } from 'theme-ui';

import type { Recommendation } from '../lib/files';

import Tag from './Tag';

const Recommendations = ({ excerpt, group, date, tags }: Recommendation) => {
  return (
    <Box
      sx={{
        borderBottomColor: 'muted',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        color: 'gray',
        paddingBottom: 3,
      }}
    >
      <Text sx={{ fontSize: [2], fontStyle: 'italic' }}>
        "{excerpt.replace(/"/g, '')}"
      </Text>
      <Flex>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </Flex>
      <Text sx={{ fontSize: 1 }}>
        <NextLink as={`/${group}`} href="/[group]" passHref>
          <Link sx={{ fontSize: 1, paddingRight: 2 }}>{pascalCase(group)}</Link>
        </NextLink>
        <Text as="span">{date}</Text>
      </Text>
    </Box>
  );
};

export default Recommendations;
