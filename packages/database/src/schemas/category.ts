import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const category = pgTable('category', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 150 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
