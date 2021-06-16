/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const bitLinks = require('./bitLinks');

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
      {
        source:
          '/zettelkasten/mental-models-the-four-criteria-model-for-choosing-actions-in-the-moment',
        destination:
          '/zettelkasten/the-four-criteria-model-for-choosing-actions-in-the-moment',
        permanent: true,
      },
      /**
       * Bit links.
       */
      ...bitLinks,
    ];
  },
  future: {
    webpack5: true,
  },
});
