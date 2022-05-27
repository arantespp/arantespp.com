import { getDrafts, getPosts } from './files';

const pageLinks = [
  {
    source: '/c',
    destination: '/contact',
  },
  {
    source: '/j',
    destination: '/journal',
  },
  {
    source: '/n',
    destination: '/network',
  },
  {
    source: '/agenda',
    destination: '/calendar',
  },
  {
    source: '/ts',
    destination: '/tweets-scheduler',
  },
  {
    source: '/tsa',
    destination: '/tweets-scheduler/all',
  },
];

export const getRedirects = async () => {
  const bitLinks = [...(await getPosts()), ...(await getDrafts())]
    .filter((post) => post.bitLink)
    .map((post) => {
      return {
        source: `/${post.bitLink}`,
        destination: (post.draft ? '/drafts' : '') + post.href,
      };
    });

  const oldUrls = [
    {
      source: '/z/:path*',
      destination: '/zettel/:path*',
    },
    {
      source: '/zettelkasten/:path',
      destination: '/zettel/:path',
    },
    {
      source: '/a/:path*',
      destination: '/blog/:path*',
    },
    {
      source: '/articles/:path*',
      destination: '/blog/:path*',
    },
    {
      source: '/b/:path*',
      destination: '/books/:path*',
    },
  ];

  return [...bitLinks, ...pageLinks, ...oldUrls].map((redirects) => ({
    ...redirects,
    permanent: false,
  }));
};
