import * as React from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';

import NotFound from '../../components/NotFound';
import PostComponent from '../../components/Post';
import * as files from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = files.getPosts({ onlyMetadata: true });
  return {
    paths: posts.map(({ metadata: { group, slug } }) => ({
      params: { group, slug },
    })),
    fallback: false,
  };
};

type Props = {
  groups: string[];
  post: {
    content?: string;
    metadata: any;
  };
  posts: Array<{
    metadata: any;
  }>;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { group, slug },
}: {
  params: { group: string; slug: string };
}) => {
  const post = files.getPosts({
    group: {
      name: group,
      slug,
    },
  })[0];
  const posts = files.getPosts({ group: { name: group }, onlyMetadata: true });
  const groups = files.getPostsGroups();
  return { props: { post, posts, groups } };
};

const Post = ({ post, posts }: Props) => {
  const {
    content,
    metadata: { title },
  } = post;

  if (!content || !title) {
    return <NotFound />;
  }

  return <PostComponent title={title} content={content} posts={posts} />;
};

export default Post;
