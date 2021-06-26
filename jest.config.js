module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['/**/*.spec.tsx'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['/**/*.spec.ts'],
    },
  ],
};
