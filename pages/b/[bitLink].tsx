import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { allPosts } from '../../lib/files';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts
      .filter(({ bitLink }) => !!bitLink)
      .map(({ bitLink }) => ({
        params: { bitLink },
      })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { bitLink },
}: {
  params: { bitLink: string };
}) => {
  const post = allPosts.find((post) => post.bitLink === bitLink);

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: post };
};

const BitLink = ({ href }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  React.useEffect(() => {
    router.push(href);
  }, [href]);

  return null;
};

export default BitLink;
