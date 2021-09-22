import { getRewrites, getRedirects } from './links';

test('getRewrites', async () => {
  const rewrites = await getRewrites();

  expect(rewrites).toEqual(
    expect.arrayContaining([
      { destination: '/articles/:slug', source: '/a/:slug' },
      { destination: '/books/:slug', source: '/b/:slug' },
      { destination: '/zettelkasten/:slug', source: '/z/:slug' },
      {
        destination: '/articles/a-letter-to-my-friend-create',
        source: '/create',
      },
      {
        destination: '/articles/five-habits-for-the-next-five-years',
        source: '/five-habits',
      },
      {
        destination:
          '/articles/from-reactive-planning-model-to-natural-planning-model',
        source: '/planning-models',
      },
      {
        destination: '/articles/last-mile-in-a-software-project',
        source: '/last-mile',
      },
      {
        destination: '/books/no-b-s-time-management-for-entrepreneurs',
        source: '/nobstime',
      },
    ]),
  );
});

test('getRedirects', async () => {
  const redirects = await getRedirects();

  console.log(redirects);
  expect(redirects).toEqual(32);
});
