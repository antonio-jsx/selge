import { db } from '@bakan/database';
import 'server-only';

export async function getProducts() {
  const result = await db.query.products.findMany();
  return result;
}
