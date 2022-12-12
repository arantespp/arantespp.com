import { GetStaticPaths } from 'next';
import { PostPage } from '../../components/PostPage';
import { zettelkasten } from '../../../lib/zettelkasten';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (
    await zettelkasten.getNotes({ groups: ['/zettel', '/books'] })
  ).map(({ group, slug }) => ({
    params: { group: group.replace('/', ''), slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group, slug },
}: {
  params: { group: string; slug: string };
}) => {
  const note = await zettelkasten.getNote({
    slug,
    group: `/${group}`,
  });

  const recommendations = await zettelkasten.getRecommendations({ note });

  if (!note) {
    throw new Error();
  }

  return {
    props: { post: note, recommendations },
  };
};

export default PostPage;
