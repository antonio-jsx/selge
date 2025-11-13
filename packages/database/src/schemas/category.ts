import { products } from './products';
import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const category = pgTable('category', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 150 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(products),
}));

export type SelectCategory = typeof category.$inferSelect;
