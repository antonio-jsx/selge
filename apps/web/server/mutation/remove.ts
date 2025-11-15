'use server';

import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db, eq } from '@bakan/database';
import { category } from '@bakan/database/schemas/category';
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
  });
