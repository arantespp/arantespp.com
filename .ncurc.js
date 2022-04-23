module.exports = {
  upgrade: true,
  target: (dependencyName) => {
    if (['@mdx-js/react', '@types/faker', 'faker'].includes(dependencyName)) {
      return 'minor';
    }

    return 'latest';
  },
};
