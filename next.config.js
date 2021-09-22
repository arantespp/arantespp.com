/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { getRewrites, getRedirects } = require('./src/lib/links');

module.exports = withBundleAnalyzer({
  async rewrites() {
    return getRewrites();
  },
  async redirects() {
    return getRedirects();
  },
});
