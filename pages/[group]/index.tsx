import * as React from 'react';

import { pascalCase } from 'change-case';
import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../../components/Layout';
import Post from '../../components/Post';
import * as files from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = files.getPostsGroups();
  return {
    paths: groups.map((group) => ({ params: { group } })),
    fallback: false,
  };
};

type Props = {
  group: string;
  content: string;
  posts: Array<{
    metadata: any;
  }>;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: { group: string };
}) => {
  const { group } = params;
  const { content } = files.getGroupPresentation(group);
  const posts = files.getPosts({
    group: {
      name: group,
    },
    onlyMetadata: true,
  });
  return { props: { content, group, posts } };
};

const GroupPresentation = ({ content, group, posts }: Props) => {
  return <Post title={pascalCase(group)} content={content} posts={posts} />;
};

export default GroupPresentation;
