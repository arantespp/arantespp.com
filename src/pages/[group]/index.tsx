import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { PostPage } from '../../components/PostPage';
import {
  getPostAndRecommendations,
  getPosts,
  getRecommendations,
  readMarkdownFile,
} from '../../../lib/files';
import { titleCase } from 'title-case';

const indexes = ['blog', 'zettelkasten', 'now', 'me', 'features'];

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

    const recommendations = ['now', 'me'].includes(path)
      ? []
      : await getRecommendations({ group });

    const { excerpt = null } = data;

    return {
      props: {
        content,
        recommendations,
        seo: {
          title: titleCase(path),
          description: excerpt,
        },
      },
    };
  }

  const { post, recommendations } = await getPostAndRecommendations({
    slug: path,
    group: 'blog',
  });

  if (!post) {
    throw new Error();
  }

  return { props: { post, recommendations } };
};

export default PostPage;
