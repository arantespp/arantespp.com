import { GROUPS, Group } from '../../../lib/groups';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { PostPage } from '../../components/PostPage';
import { Themed } from 'theme-ui';
import { getDraft, getDrafts } from '../../../lib/files';
import RecommendationsList from '../../components/RecommendationsList';

export const getStaticPaths: GetStaticPaths = async () => {
  const blogDrafts = await getDrafts({ group: 'blog' });

  const paths = [...GROUPS, ...blogDrafts.map(({ slug }) => slug)];

  return {
    paths: paths.map((path) => ({
      params: { group: path },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group: path },
}: {
  params: { group: Group | string };
}) => {
  if (GROUPS.includes(path as Group)) {
    const drafts = (await getDrafts({ group: path as Group })).map(
      ({ content, ...rest }) => rest,
    );
    return { props: { drafts } };
  }

  const draft = await getDraft({ group: 'blog', slug: path });
  return { props: { draft } };
};

const DraftsIndex = ({
  drafts,
  draft,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (drafts) {
    return (
      <>
        <NextSeo nofollow noindex />
        <Themed.h1>Drafts</Themed.h1>
        <RecommendationsList recommendations={drafts} />
      </>
    );
  }

  if (draft) {
    return (
      <>
        <PostPage
          post={draft}
          seo={{
            nofollow: true,
            noindex: true,
          }}
        />
      </>
    );
  }

  return null;
};

export default DraftsIndex;
