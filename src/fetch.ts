/**
 * https://stackoverflow.com/a/44344023/8786986
 */
const dev = process.env.NODE_ENV !== 'production';

export const URL = dev ? 'http://localhost:3311' : process.env.NEXT_PUBLIC_URL;

const modifiedFetch = (input: string, init?: RequestInit) => {
  return fetch(`${URL}${input}`, init);
};

export { modifiedFetch as fetch };
