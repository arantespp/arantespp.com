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
  groups: string[];
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
  const groups = files.getPostsGroups();
  const posts = files.getPosts({
    group: {
      name: group,
    },
    onlyMetadata: true,
  });
  return { props: { content, groups, group, posts } };
};

const GroupPresentation = ({ content, groups, group, posts }: Props) => {
  return (
    <Layout groups={groups}>
      <Post title={pascalCase(group)} content={content} posts={posts} />
    </Layout>
  );
};

export default GroupPresentation;
