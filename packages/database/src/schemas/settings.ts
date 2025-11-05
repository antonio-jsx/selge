import { integer, json, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export interface Settings {
  title: string;
  description: string;
  banner?: {
    title: string;
    subtitle: string;
    button: {
      title: string;
      link: string;
    };
  };
}

export const settings = pgTable('settings', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 60 }).notNull(),
  description: text().notNull(),
  metaData: json('meta_data').$type<Settings>(),
});
