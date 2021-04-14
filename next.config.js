/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      /**
       * Old links.
       */
      {
        source: '/all-posts',
        destination: '/all',
        permanent: true,
      },
      {
        source: '/graph',
        destination: '/network',
        permanent: true,
      },
      {
        source: '/zettelkasten/hyperbolic-discount',
        destination: '/zettelkasten/hyperbolic-discounting',
        permanent: true,
      },
      /**
       * Bit links.
       */
      {
        source: '/five-habits',
        destination: '/articles/five-habits-for-the-next-five-years',
        permanent: true,
      },
      {
        source: '/no-bs-time',
        destination: '/books/no-bs-time-management-for-entrepreneurs',
        permanent: true,
      },
      {
        source: '/getting-things-done',
        destination: '/_drafts/books/getting-things-done',
        permanent: false,
      },
    ];
  },
  future: {
    webpack5: true,
  },
});
