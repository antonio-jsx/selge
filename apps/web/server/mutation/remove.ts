'use server';

import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db, eq } from '@bakan/database';
import { category } from '@bakan/database/schemas/category';
import { products } from '@bakan/database/schemas/products';
import { updateTag } from 'next/cache';
import z from 'zod';

const remove = z.object({
  id: z.number().min(1),
  section: z.enum(['category', 'products']),
});

export const removeAction = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'remove' })
  .inputSchema(remove)
  .action(async ({ parsedInput: { id, section } }) => {
    if (section === 'category') {
      await db.delete(category).where(eq(category.id, id));
      updateTag(section);
    }

    if (section === 'products') {
      await db.delete(products).where(eq(products.id, id));
      updateTag(section);
      updateTag('category');
    }
  });
