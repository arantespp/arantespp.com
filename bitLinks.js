/**
 * Need to compile src/lib/bitLinks.ts before requiring.
 */
const { getBitLinks } = require('./src/lib/bitLinks.js');

const bitLinks = [
  {
    source: '/a',
    destination: '/all',
    permanent: true,
  },
  {
    source: '/c',
    destination: '/contact',
    permanent: true,
  },
  {
    source: '/j',
    destination: '/journal',
    permanent: true,
  },
  {
    source: '/n',
    destination: '/network',
    permanent: true,
  },
  ...getBitLinks(),
];

const hasDuplicatedBitLinks = bitLinks.reduce((acc, cur, index) => {
  if (acc) {
    return acc;
  }

  if (bitLinks.findIndex((b) => b.source === cur.source) !== index) {
    return JSON.stringify(cur);
  }

  return '';
}, '');

if (hasDuplicatedBitLinks) {
  throw new Error(`Duplicated bit link: ${hasDuplicatedBitLinks}`);
}

module.exports = bitLinks;
