import { InferGetStaticPropsType } from 'next';
import { Box, Themed } from 'theme-ui';

import { getRevuePosts } from '../lib/files';

import RecommendationsList from '../components/RecommendationsList';

export const getStaticProps = async () => {
  const posts = await getRevuePosts();
  return { props: { posts } };
};

const Revue = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Themed.h1>Revue Weekly Digest Posts</Themed.h1>
    <Themed.p>
      List of posts that will be used in my{' '}
      <Themed.a href="https://www.getrevue.co/profile/arantespp">
        Revue weekly digest
      </Themed.a>
      . The posts below are posts since last Tuesday.
    </Themed.p>
    <Box sx={{ marginY: 5 }}>
      <RecommendationsList recommendations={posts} />
    </Box>
  </>
);

export default Revue;
