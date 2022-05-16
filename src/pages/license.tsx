import { PostPage } from '../components/PostPage';
import { readMarkdownFile } from '../../lib/files';

export const getStaticProps = async () => {
  const { content = '' } = (await readMarkdownFile('../LICENSE.md')) || {};
  return { props: { content } };
};

export default PostPage;
