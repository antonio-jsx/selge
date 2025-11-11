import {
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const sectionEnum = pgEnum('section', ['home', 'hero']);

export const settings = pgTable('settings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  section: sectionEnum().notNull().unique(),
  title: varchar({ length: 60 }).notNull(),
  description: text().notNull(),
  metaData: json('meta_data'),
});

export type SelectSettings = typeof settings.$inferSelect;
