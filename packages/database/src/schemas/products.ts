import { category } from './category';
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 150 }).notNull(),
  sku: varchar({ length: 150 }).notNull(),
  shortDescription: varchar('short_description', { length: 255 }),
  description: text().notNull(),
  price: numeric({ precision: 10, scale: 2, mode: 'number' }).notNull(),
  costPrice: numeric('cost_price', { precision: 10, scale: 2, mode: 'number' }),
  stock: integer().notNull().default(0),
  images: jsonb().$type<string[]>(),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  categoryId: integer('category_id').references(() => category.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const productRelations = relations(products, ({ one }) => ({
  category: one(category, {
    fields: [products.categoryId],
    references: [category.id],
  }),
}));

export type SelectProduct = typeof products.$inferSelect;
