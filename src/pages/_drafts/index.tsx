import { InferGetStaticPropsType } from 'next';
import { Themed } from 'theme-ui';

import { getDrafts } from '../../lib/files';

import HTMLHeaders from '../../components/HTMLHeaders';
import RecommendationsList from '../../components/RecommendationsList';

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
