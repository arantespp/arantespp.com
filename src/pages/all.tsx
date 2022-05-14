import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { Text, Themed } from 'theme-ui';
import { getPosts } from '../../lib/files';
import Link from '../components/Link';

export const getStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts: posts
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ title, href }) => ({ title, href })),
    },
  };
};

const AllRaw = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Themed.h1>All Posts - Raw</Themed.h1>

      <Text
        sx={{ fontStyle: 'italic', marginY: 4, display: 'block', fontSize: 2 }}
      >
        <Link href="/search">Search posts.</Link>
      </Text>

      {posts.map(({ title, href }) => (
        <Themed.p key={href}>
          <Link href={href}>{title}</Link>
        </Themed.p>
      ))}
    </>
  );
};

export default AllRaw;
