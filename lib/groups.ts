export const GROUPS = ['articles', 'zettelkasten'] as const;

export type Group = typeof GROUPS[number];
