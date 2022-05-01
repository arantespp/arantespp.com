import { GROUPS } from '../../../lib/groups';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { Themed } from 'theme-ui';
import { getDrafts } from '../../../lib/files';
import RecommendationsList from '../../components/RecommendationsList';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: GROUPS.map((group) => ({
    params: { group },
  })),
  fallback: false,
});

export const getStaticProps = async ({
  params: { group },
}: {
  params: { group: string };
}) => {
  const drafts = await getDrafts();
  return { props: { drafts: drafts.filter((draft) => draft.group === group) } };
};

const DraftsIndex = ({
  drafts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <NextSeo nofollow noindex />
    <Themed.h1>Drafts</Themed.h1>
    <RecommendationsList recommendations={drafts} />
  </>
);

export default DraftsIndex;
