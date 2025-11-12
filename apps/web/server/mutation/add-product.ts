'use server';

import { productSchema } from '@/app/(admin)/dashboard/products/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@bakan/database';
import { products } from '@bakan/database/schemas/products';
import { updateTag } from 'next/cache';

export const addProduct = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'add-product' })
  .inputSchema(productSchema)
  .action(async ({ parsedInput: data }) => {
    await db.insert(products).values(data);
    updateTag('featured');
  });
