import Head from 'next/head';

import type { Post } from '../lib/files';

const PostHeaders = ({ post }: { post: Post }) => {
  const { excerpt, image, href, title, group, book, keywords } = post;

  const imageContent = (() => {
    if (group === 'zettelkasten') {
      return '/images/david-travis-5bYxXawHOQg-unsplash.jpg';
    }

    if (image) {
      return image.url;
    }

    if (book?.image) {
      return book.image;
    }

    return '';
  })();

  const imageContentUrl = imageContent.startsWith('/')
    ? `https://arantespp.com${imageContent}`
    : imageContent;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" key="og:type" content="website" />
      <meta
        key="og:url"
        property="og:url"
        content={`https://arantespp.com${href}`}
      />
      <meta key="description" name="description" content={excerpt} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={excerpt} />
      <meta key="og:image" property="og:image" content={imageContentUrl} />
      <meta key="keywords" property="keywords" content={keywords.join(', ')} />
    </Head>
  );
};

export default PostHeaders;
