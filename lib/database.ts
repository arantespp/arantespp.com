import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { JsonDB } from 'node-json-db';

/**
 * https://github.com/Belphemur/node-json-db
 */
export const db = new JsonDB(new Config('database/db', true, true, '/'));
