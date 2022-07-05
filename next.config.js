/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { getRedirects } = require('./lib/links');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return getRedirects();
  },
};

module.exports = withBundleAnalyzer(nextConfig);
