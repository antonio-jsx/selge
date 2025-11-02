import { env } from './env';
import * as users from './schemas/users';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema: { ...users } });
