import { InferGetStaticPropsType } from 'next';
import { Themed } from 'theme-ui';

import { getDrafts } from '../../src/lib/files';

import HTMLHeaders from '../../src/components/HTMLHeaders';
import RecommendationsList from '../../src/components/RecommendationsList';

export const getStaticProps = async () => {
  const drafts = getDrafts();
  return { props: { drafts } };
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
