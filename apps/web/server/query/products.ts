import 'server-only';

import { slugify } from '@/lib/utils';
import { db } from '@bakan/database';
import type { SelectProduct } from '@bakan/database/schemas/products';

export async function getProducts(): Promise<SelectProduct[]> {
  const result = await db.query.products.findMany();
  return result;
}

export async function getFeaturedProducts(): Promise<SelectProduct[]> {
  const result = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.isFeatured, true),
  });

  return result;
}

export async function getProductById(
  id: number,
  slug: string
): Promise<SelectProduct | undefined> {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, id),
  });

  if (!product || slugify(product.name) !== slug) {
    throw new Error('the product does not exist');
  }

  return product;
}
