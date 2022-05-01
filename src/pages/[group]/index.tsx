import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { getFile } from '../../../lib/files';
import {
  getPostAndRecommendations,
  getPosts,
  getRecommendations,
} from '../../../lib/filesv2';
import { titleCase } from 'title-case';
import dynamic from 'next/dynamic';

const IndexPage = dynamic(() => import('../../components/IndexPage'));
const Post = dynamic(() => import('../../components/Post'));
const NotFound = dynamic(() => import('../../components/NotFound'));
const Recommendations = dynamic(
  () => import('../../components/Recommendations'),
);

const indexes = ['blog', 'zettelkasten', 'now', 'me'];

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogPosts = await getPosts({ group: 'blog' });

  return {
    paths: [
      ...indexes.map((file) => ({ params: { group: file } })),
      ...allBlogPosts.map(({ slug }) => ({ params: { group: slug } })),
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { group: path },
}: {
  params: { group: string };
}) => {
  if (indexes.includes(path)) {
    const { data = {}, content = '' } = getFile(`${path}.md`) || {};
    const group = path === 'zettelkasten' ? 'zettel' : 'blog';
    const recommendations = await getRecommendations({ group });
    const { excerpt = null } = data;

    return {
      props: {
        index: {
          content,
          recommendations,
          title: titleCase(path),
          excerpt,
        },
      },
    };
  }

  const post = await getPostAndRecommendations({ slug: path, group: 'blog' });

  return { props: { post } };
};

const GroupIndex = ({
  index,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (index) {
    return <IndexPage {...index} />;
  }

  if (post.post) {
    return (
      <>
        <Post post={post.post} />
        <Recommendations recommendations={post.recommendations} />
      </>
    );
  }

  return <NotFound />;
};

export default GroupIndex;
