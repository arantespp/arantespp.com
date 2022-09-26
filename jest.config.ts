const config = {
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

export default config;
