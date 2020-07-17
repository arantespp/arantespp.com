import * as React from 'react';

import { GetStaticProps } from 'next';

import Post from '../components/Post';

import {
  getPostAndPostsRecommendations,
  PostAndPostsRecommendations,
} from '../lib/files';

type Props = PostAndPostsRecommendations;

export const getStaticProps: GetStaticProps<PostAndPostsRecommendations> = async () => {
  return { props: getPostAndPostsRecommendations({ slug: 'index' }) };
};

const Index = (props: Props) => {
  return <Post {...props} />;
};

export default Index;
