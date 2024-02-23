import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle/migrations',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
} satisfies Config;
