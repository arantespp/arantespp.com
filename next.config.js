/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * Some day, I need to remove this line and check if rehype-raw works without
 * next-transpile-modules. I removed it because it breaks the Twitter embed.
 */
// const withTM = require('next-transpile-modules')([
//   'rehype-raw',
//   'hast-util-raw',
//   'unist-util-position',
//   'property-information',
//   'web-namespaces',
//   'hast-util-to-parse5',
//   'hast-to-hyperscript',
//   'zwitch',
//   'html-void-elements',
// ]);

const { getRewrites, getRedirects } = require('./src/lib/links');

module.exports = withBundleAnalyzer({
  async rewrites() {
    return getRewrites();
  },
  async redirects() {
    return getRedirects();
  },
});
