export const GROUPS = ['articles', 'books', 'zettelkasten'] as const;

export type Group = typeof GROUPS[number];

export const groupAbbreviation: { [key in Group]: string } = {
  articles: 'a',
  books: 'b',
  zettelkasten: 'z',
};
