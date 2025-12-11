import 'server-only';

import { db, sql } from '@selge/database';
import type { SelectCategory } from '@selge/database/schemas/category';
import { cacheTag } from 'next/cache';

export async function getCategory() {
  'use cache';
  cacheTag('category');

  const result = await db.query.category.findMany({
    extras: {
      productsTotal:
        sql<number>`(select count(*) from "products" where "products"."category_id" = "category"."id")`.as(
          'productsTotal'
        ),
    },
    orderBy: (category, { asc }) => [asc(category.id)],
  });

  return result;
}

export async function getFeaturedCategory(): Promise<SelectCategory[]> {
  const result = await db.query.category.findMany({
    where: (category, { eq }) => eq(category.isFeatured, true),
  });

  return result;
}
