import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { Themed } from 'theme-ui';

import { getDrafts, getGroups } from '../../src/lib/files';

import HTMLHeaders from '../../src/components/HTMLHeaders';
import RecommendationsList from '../../src/components/RecommendationsList';

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
    <HTMLHeaders noIndex />
    <Themed.h1>Drafts</Themed.h1>
    <RecommendationsList recommendations={drafts} />
  </>
);

export default DraftsIndex;
