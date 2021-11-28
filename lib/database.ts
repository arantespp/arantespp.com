import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

/**
 * https://github.com/Belphemur/node-json-db
 */
export const db = new JsonDB(new Config('database/db', true, true, '/'));
