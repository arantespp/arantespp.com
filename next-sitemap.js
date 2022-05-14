const { getPosts } = require('./lib/files');

const exclude = [
  '/api-key',
  '/digest',
  '/drafts',
  '/editor',
  '/journal',
  '/problems',
  '/tweets-scheduler',
];

const siteUrl = 'https://arantespp.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  exclude: exclude.flatMap((e) => [e, `${e}/*`]),
  transform: async (config, path) => {
    const posts = await getPosts();

    const post = posts.find((p) => p.href === path);

    const priority = (() => {
      if (path === '/') {
        return 1;
      }

      if (['/contact', '/now', '/me'].includes(path)) {
        return 0.9;
      }

      if (['/zettelkasten', '/blog', '/books'].includes(path)) {
        return 0.85;
      }

      if (post?.group === 'blog') {
        return 0.8;
      }

      return 0.7;
    })();

    const lastmod = post?.updatedAt;

    return {
      loc: path,
      changefreq: 'monthly',
      priority,
      lastmod,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: exclude,
      },
    ],
  },
};
