/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
});

const { getRedirects } = require('./lib/links');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return getRedirects();
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(withBundleAnalyzer(nextConfig));
