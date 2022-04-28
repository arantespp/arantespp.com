/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { getRedirects } = require('./lib/links');

module.exports = withBundleAnalyzer({
  async redirects() {
    return getRedirects();
  },
});
