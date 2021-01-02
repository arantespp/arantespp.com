export const GROUPS = ['blog', 'zettelkasten', 'me'] as const;

export type Group = typeof GROUPS[number];
