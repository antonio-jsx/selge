'use server';

import { productSchema } from '@/app/(admin)/dashboard/products/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@selge/database';
import { products } from '@selge/database/schemas/products';
import { updateTag } from 'next/cache';

export const addProduct = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'add-product' })
  .inputSchema(productSchema)
  .action(
    async ({ parsedInput: { weight, depth, width, height, ...data } }) => {
      await db
        .insert(products)
        .values({ ...data, metaData: { weight, depth, width, height } });
      updateTag('featured');
      updateTag('category');
    }
  );
