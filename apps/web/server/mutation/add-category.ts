'use server';

import { categorySchema } from '@/app/(admin)/dashboard/category/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@selge/database';
import { category } from '@selge/database/schemas/category';
import { updateTag } from 'next/cache';

export const addCategory = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'add-category' })
  .inputSchema(categorySchema)
  .action(async ({ parsedInput: { name } }) => {
    await db.insert(category).values({ name });
    updateTag('category');
    updateTag('featured_category');
  });
