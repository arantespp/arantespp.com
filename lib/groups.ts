export const GROUPS = ['essays', 'zettelkasten'] as const;

export type Group = typeof GROUPS[number];
