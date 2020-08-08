import * as React from 'react';

import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import {
  getPostAndPostsRecommendations,
  PostAndPostsRecommendations,
} from '../lib/files';

const Post = dynamic(() => import('../components/Post'));

type Props = PostAndPostsRecommendations;

export const getStaticProps: GetStaticProps<PostAndPostsRecommendations> = async () => {
  return {
    props: getPostAndPostsRecommendations({ slug: 'index', limit: 50 }),
  };
};

const Index = (props: Props) => {
  return <Post {...props} />;
};

export default Index;
