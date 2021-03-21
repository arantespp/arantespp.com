const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/five-habits',
        destination: '/articles/five-habits-for-the-next-five-years',
        permanent: true,
      },
    ];
  },
});
