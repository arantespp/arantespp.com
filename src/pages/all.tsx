import * as React from 'react';
import { GROUPS } from '../../lib/groups';
import { InferGetStaticPropsType } from 'next';
import { Text, Themed } from 'theme-ui';
import { getPosts } from '../../lib/files';
import { titleCase } from 'title-case';
import Heading from '../components/Heading';
import Link from '../components/Link';

type GroupPosts = {
  group: string;
  posts: { title: string; href: string }[];
};

export const getStaticProps = async () => {
  const groupPostsList = await Promise.all(
    GROUPS.map(async (group) => {
      return {
        group: titleCase(group),
        posts: (await getPosts({ group }))
          .map(({ title, href }) => ({
            title,
            href,
          }))
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    }),
  );

  return { props: { groupPostsList } };
};

const GroupLinks = ({ group, posts }: GroupPosts) => {
  return (
    <>
      <Heading level={2}>{group}</Heading>

      {posts.map(({ title, href }) => (
        <Themed.p key={href}>
          <Link href={href}>{title}</Link>
        </Themed.p>
      ))}
    </>
  );
};

const AllRaw = ({
  groupPostsList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Themed.h1>All Posts - Raw</Themed.h1>

      <Text
        sx={{ fontStyle: 'italic', marginY: 4, display: 'block', fontSize: 2 }}
      >
        <Link href="/search">Search posts.</Link>
      </Text>

      {groupPostsList.map((groupPosts) => (
        <GroupLinks key={groupPosts.group} {...groupPosts} />
      ))}
    </>
  );
};

export default AllRaw;
