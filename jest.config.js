module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['/**/*.spec.tsx'],
      testTimeout: 20000,
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['/**/*.spec.ts'],
    },
  ],
};
