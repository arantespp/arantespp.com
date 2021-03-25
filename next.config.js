const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/all-posts',
        destination: '/all',
        permanent: true,
      },
      {
        source: '/five-habits',
        destination: '/articles/five-habits-for-the-next-five-years',
        permanent: true,
      },
    ];
  },
});
