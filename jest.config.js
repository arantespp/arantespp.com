module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['/**/*.spec.tsx'],
      timers: 'fake',
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['/**/*.spec.ts'],
    },
  ],
};
