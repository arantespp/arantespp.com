export const GROUPS = ['blog', 'zettelkasten', 'now'] as const;

export type Group = typeof GROUPS[number];
