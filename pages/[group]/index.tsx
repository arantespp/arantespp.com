import * as React from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';

import Post from '../../components/Post';

import {
  getGroups,
  getPostAndPostsRecommendations,
  Group,
  PostAndPostsRecommendations,
} from '../../lib/files';

type Props = PostAndPostsRecommendations;

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = getGroups();
  return {
    paths: groups.map((group) => ({ params: { group } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostAndPostsRecommendations> = async ({
  params: { group },
}: {
  params: { group: Group };
}) => {
  return { props: getPostAndPostsRecommendations({ slug: 'index', group }) };
};

const GroupIndex = (props: Props) => {
  return <Post {...props} />;
};

export default GroupIndex;
