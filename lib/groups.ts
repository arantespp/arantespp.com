export const GROUPS = ['articles', 'books', 'zettelkasten'] as const;

export type Group = typeof GROUPS[number];
