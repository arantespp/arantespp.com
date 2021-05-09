import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Themed } from 'theme-ui';

import { getDrafts, getGroups } from '../../lib/files';

import RecommendationsList from '../../components/RecommendationsList';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getGroups().map((group) => ({
    params: { group },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { group },
}: {
  params: { group: string };
}) => {
  const drafts = getDrafts();
  return { props: { drafts: drafts.filter((draft) => draft.group === group) } };
};

const DraftsIndex = ({
  drafts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <meta key="robots" name="robots" content="noindex,follow" />
      <meta key="googlebot" name="googlebot" content="noindex,follow" />
    </Head>
    <Themed.h1>Drafts</Themed.h1>
    <RecommendationsList recommendations={drafts} />
  </>
);

export default DraftsIndex;
