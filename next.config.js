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
       * Bit links.
       */
      ...bitLinks,
    ];
  },
  future: {
    webpack5: true,
  },
});
