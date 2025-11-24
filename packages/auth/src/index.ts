import { db } from '@selge/database';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  experimental: {
    joins: true,
  },
  database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), admin()],
});
