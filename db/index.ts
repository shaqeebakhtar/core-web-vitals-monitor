import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';
import * as schema from './schema';

const connection = createConnection({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema, mode: 'default' });
