import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Styled } from 'theme-ui';

import { getDrafts } from '../../lib/files';

import RecommendationsList from '../../components/RecommendationsList';

export const getStaticProps = async () => {
  const drafts = getDrafts();
  return { props: { drafts } };
};

const DraftsIndex = ({
  drafts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="noindex,follow" />
        <meta key="googlebot" name="googlebot" content="noindex,follow" />
      </Head>
      <Styled.h1>Drafts</Styled.h1>
      <RecommendationsList recommendations={drafts} />
    </>
  );
};

export default DraftsIndex;
