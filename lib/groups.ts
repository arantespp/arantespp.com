export const GROUPS = ['articles', 'zettelkasten', 'now'] as const;

export type Group = typeof GROUPS[number];
