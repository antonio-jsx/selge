import 'server-only';

import { db } from '@bakan/database';
import { cacheTag } from 'next/cache';

export async function getCategory() {
  'use cache';
  cacheTag('category');

  const result = await db.query.category.findMany();

  return result;
}
