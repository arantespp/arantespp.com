import { getDrafts, getAllPosts } from './files';

export const getBitLinks = () => {
  return [...getDrafts(), ...getAllPosts()].flatMap((post) =>
    (post.bitLinks || []).map((bitLink) => ({
      source: `/${bitLink}`,
      destination: post.href,
      permanent: !post.draft,
    })),
  );
};
