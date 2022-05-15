import { getRecommendations, readMarkdownFile } from '../../lib/files';
import IndexPage from '../components/IndexPage';

export const getStaticProps = async () => {
  const { content = '' } = (await readMarkdownFile('index.md')) || {};

  const seo = {
    title: "Pedro's Blog",
    openGraph: { images: [{ url: 'https://arantespp.com/me.webp' }] },
  };

  const recommendations = await getRecommendations();

  return { props: { recommendations, seo, content } };
};

export default IndexPage;
