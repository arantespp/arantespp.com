import Head from 'next/head';

const PostHeaders = ({ keywords }: { keywords: string[] }) => (
  <Head>
    <meta key="keywords" name="keywords" content={keywords.join(', ')} />
  </Head>
);

export default PostHeaders;
