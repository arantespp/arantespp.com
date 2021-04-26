/**
 * Created because Jest.
 */
module.exports = {
  presets: [
    'next/babel',
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
