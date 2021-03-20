import Head from 'next/head';

import type { Post } from '../lib/files';

const PostComponent = ({ post }: { post: Post }) => {
  const { excerpt, image, href, title, group } = post;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:url"
        key="og:url"
        content={`https://arantespp.com${href}`}
      />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:description" key="og:description" content={excerpt} />
      {group === 'zettelkasten' && (
        <meta
          property="og:image"
          key="og:image"
          content="https://source.unsplash.com/HOrhCnQsxnQ"
        />
      )}
      {image && <meta property="og:image" key="og:image" content={image.url} />}
    </Head>
  );
};

export default PostComponent;
