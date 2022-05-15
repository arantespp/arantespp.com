import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import {
  getPostAndRecommendations,
  getPosts,
  getRecommendations,
  readMarkdownFile,
} from '../../../lib/files';
import { titleCase } from 'title-case';
import IndexPage from '../../components/IndexPage';
import NotFound from '../../components/NotFound';
import Post from '../../components/Post';
import Recommendations from '../../components/Recommendations';

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
    const { data = {}, content = '' } =
      (await readMarkdownFile(`${path}.md`)) || {};
    const group = path === 'zettelkasten' ? 'zettel' : 'blog';
    const recommendations = await getRecommendations({ group });
    const { excerpt = null } = data;

    return {
      props: {
        index: {
          content,
          recommendations,
          seo: {
            title: titleCase(path),
            description: excerpt,
          },
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
