/**
 * Need to compile src/lib/bitLinks.ts before requiring.
 */
const { getBitLinks } = require('./src/lib/bitLinks.js');

const oldLinks = [
  {
    source: '/books/no-bs-time-management-for-entrepreneurs',
    destination: '/books/no-b-s-time-management-for-entrepreneurs',
    permanent: true,
  },
  {
    source: '/instagram/no-bs-time',
    destination: '/instagram/no-b-s-time',
    permanent: true,
  },
];

const pageLinks = [
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
];

const bitLinks = [...oldLinks, ...pageLinks, ...getBitLinks()];

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
