import * as React from 'react';

import { Typography } from '@material-ui/core';
import { GetStaticProps } from 'next';

import Layout from '../components/Layout';
import * as files from '../lib/files';

type Props = {
  groups: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const groups = files.getPostsGroups();
  return { props: { groups } };
};

const Index = ({ groups }: Props) => {
  return (
    <Layout groups={groups}>
      <main>
        <Typography align="center" variant="h1">
          Welcome to Pedro Arantes blog
        </Typography>
      </main>
    </Layout>
  );
};

export default Index;
