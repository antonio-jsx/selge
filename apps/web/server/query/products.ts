import 'server-only';

import type { ProductsWithCategory, SearchProducts } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { and, db, eq, getTableColumns, ilike } from '@selge/database';
import { category } from '@selge/database/schemas/category';
import { products, type SelectProduct } from '@selge/database/schemas/products';

export async function getProducts({
  search,
  tag,
}: SearchProducts): Promise<ProductsWithCategory[]> {
  const p = getTableColumns(products);
  const c = getTableColumns(category);

  const result = await db
    .select({
      ...p,
      category: c,
    })
    .from(products)
    .leftJoin(category, eq(products.categoryId, category.id))
    .where(
      and(
        search ? ilike(p.name, `%${search}%`) : undefined,
        tag ? ilike(c.name, `%${tag}%`) : undefined
      )
    );

  return result;
}

export async function getFeaturedProducts(): Promise<SelectProduct[]> {
  const result = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.isFeatured, true),
  });

  return result;
}

type SelectProductWithCategory = SelectProduct & {
  category: { name: string } | null;
};

export async function getProductById(
  id: number,
  slug: string
): Promise<SelectProductWithCategory | undefined> {
  const product = await db.query.products.findFirst({
    with: { category: { columns: { name: true } } },
    where: (products, { eq }) => eq(products.id, id),
  });

  if (!product || slugify(product.name) !== slug) {
    throw new Error('the product does not exist');
  }

  return product;
}
