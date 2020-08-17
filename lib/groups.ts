export const GROUPS = ['essays', 'zettelkasten', 'me'] as const;

export type Group = typeof GROUPS[number];
