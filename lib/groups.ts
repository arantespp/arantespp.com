export const GROUPS = ['blog', 'books', 'zettel'] as const;

export type Group = typeof GROUPS[number];
