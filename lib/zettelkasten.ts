import * as path from 'path';
import { Zettelkasten } from '@tereza-tech/zettel';

const postsDir = path.join(process.cwd(), 'posts');

export const zettelkasten = new Zettelkasten({
  postsDir,
  ignoreGroups: ['/', '/art', '/instagram', '/journal', '/planning'],
  requiredMetadata: ['title', 'date', 'excerpt'],
  normalizeOnInit: false,
});
