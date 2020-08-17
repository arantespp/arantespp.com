export const GROUPS = ['zettelkasten', 'me'] as const;

export type Group = typeof GROUPS[number];
