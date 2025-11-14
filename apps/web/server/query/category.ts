import 'server-only';

import { db, sql } from '@bakan/database';
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
  });

  return result;
}
