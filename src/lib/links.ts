import { getDrafts, getAllPosts } from './files';
import { groupAbbreviation, GROUPS } from './groups';

export const getRewrites = async () => {
  const groupRewrites = GROUPS.map((group) => ({
    destination: `/${group}/:slug`,
    source: `/${groupAbbreviation[group]}/:slug`,
  }));

  const bitLinks = getAllPosts()
    .filter((post) => post.bitLink)
    .map((post) => {
      if (post.bitLink) {
        return {
          destination: post.href,
          source: `/${post.bitLink}`,
        };
      }

      return {};
    });

  return [...groupRewrites, ...bitLinks];
};

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
  {
    source: '/revue',
    destination: '/digest',
    permanent: true,
  },
];

const pageLinks = [
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
  {
    source: '/agenda',
    destination: '/calendar',
    permanent: true,
  },
  {
    source: '/miro',
    destination: 'https://miro.com/app/board/o9J_l4_vcY8=/',
    permanent: true,
  },
];

export const getRedirects = async () => {
  const groupRedirects = GROUPS.map((group) => ({
    source: `/${group}/:slug`,
    destination: `/${groupAbbreviation[group]}/:slug`,
    permanent: true,
  }));

  const bitLinks = getAllPosts()
    .filter((post) => post.bitLink)
    .flatMap((post) => {
      if (post.bitLink) {
        return [
          {
            source: `/${post.group}/${post.slug}`,
            destination: `/${post.bitLink}`,
            permanent: true,
          },
          {
            source: `/${groupAbbreviation[post.group]}/${post.slug}`,
            destination: `/${post.bitLink}`,
            permanent: true,
          },
        ];
      }

      return [];
    });

  const draftsBitLinks = getDrafts()
    .filter((post) => post.bitLink)
    .map((post) => ({
      source: `/${post.bitLink}`,
      destination: post.href,
      permanent: false,
    }));

  /**
   * If a post is a draft, you cant access it via group abbreviation.
   * If you do this, you'll be redirected to Not Found page, that shows a
   * link to the draft post. This link add `/drafts` to the URL, but new URL,
   * `/drafts/b/some-book` does not exist. This redirect redirect URL to the
   * correct one, `/drafts/books/some-book`.
   */
  const draftsAbbreviation = GROUPS.map((group) => ({
    destination: `/drafts/${group}/:path*`,
    source: `/drafts/${groupAbbreviation[group]}/:path*`,
    permanent: false,
  }));

  return [
    ...groupRedirects,
    ...bitLinks,
    ...draftsBitLinks,
    ...draftsAbbreviation,
    ...pageLinks,
    ...oldLinks,
  ];
};
