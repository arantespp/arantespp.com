import Head from 'next/head';

import type { Post } from '../lib/files';

const PostComponent = ({ post }: { post: Post }) => {
  const { excerpt, image, href, title, group, book } = post;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:url"
        key="og:url"
        content={`https://arantespp.com${href}`}
      />
      <meta name="Description" content={excerpt} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:description" key="og:description" content={excerpt} />
      {group === 'zettelkasten' && (
        <meta
          property="og:image"
          key="og:image"
          content="https://source.unsplash.com/5bYxXawHOQg"
        />
      )}
      {image && <meta property="og:image" key="og:image" content={image.url} />}
      {book?.image && (
        <meta property="og:image" key="og:image" content={book.image} />
      )}
    </Head>
  );
};

export default PostComponent;
