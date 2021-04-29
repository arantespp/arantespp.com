import Head from 'next/head';

const NoIndexHeaders = () => (
  <Head>
    <meta key="robots" name="robots" content="noindex,follow" />
    <meta key="googlebot" name="googlebot" content="noindex,follow" />
  </Head>
);

export default NoIndexHeaders;
