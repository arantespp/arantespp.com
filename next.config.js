/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { getRewrites, getRedirects } = require('./lib/links');

module.exports = withBundleAnalyzer({
  async rewrites() {
    return getRewrites();
  },
  async redirects() {
    return getRedirects();
  },
});
