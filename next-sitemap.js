const { getRewrites } = require('./lib/links');
const { groupAbbreviation, GROUPS } = require('./lib/groups');

const exclude = [
  '/api-key',
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
    let loc = path;

    /**
     * Replace rewrites (bit links).
     */
    const rewrites = await getRewrites();

    loc = rewrites.reduce((loc, { source, destination }) => {
      if (loc.includes(destination)) {
        return loc.replace(destination, source);
      }

      return loc;
    }, loc);

    /**
     * Replace group abbreviation.
     */
    loc = GROUPS.reduce((loc, group) => {
      return loc.replace(`/${group}/`, `/${groupAbbreviation[group]}/`);
    }, loc);

    const priority = (() => {
      if (path === '/') {
        return 1;
      }

      if (['/contact', '/now', '/me'].includes(path)) {
        return 0.9;
      }

      if (path.includes('/articles/')) {
        return 0.8;
      }

      return 0.7;
    })();

    return {
      loc,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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
