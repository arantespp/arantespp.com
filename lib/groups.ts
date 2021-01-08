export const GROUPS = ['blog', 'zettelkasten', 'contact', 'now'] as const;

export type Group = typeof GROUPS[number];
