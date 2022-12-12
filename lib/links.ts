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
  {
    source: '/dp',
    destination: '/daily-post',
  },
];

export const getRedirects = async () => {
  const [posts, drafts] = await Promise.all([getPosts(), getDrafts()]);

  const bitLinks = [...posts, ...drafts]
    .filter((post) => post.bitLink)
    .map((post) => {
      return {
        source: `/${post.bitLink}`,
        destination: post.href,
      };
    });

  /**
   * Redirect blog article draft old links to the post's permalink in case
   * someone has the old draft link but the post isn't draft anymore.
   */
  const oldDrafts = posts
    .filter((post) => post.group === 'blog')
    .map((post) => {
      return {
        source: `/drafts${post.href}`,
        destination: post.href,
      };
    });

  return [...bitLinks, ...pageLinks, ...oldDrafts].map((redirects) => ({
    ...redirects,
    permanent: false,
  }));
};
