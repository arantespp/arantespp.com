import * as path from 'path';
import { Zettelkasten } from '@tereza-tech/zettel';

const notesDir = path.join(process.cwd(), 'posts');

export const zettelkasten = new Zettelkasten({
  notesDir,
  ignoreGroups: ['/', '/art', '/instagram', '/journal', '/planning'],
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: false,
});
