'use server';

import { taxesSchema } from '@/app/(admin)/dashboard/settings/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@bakan/database';
import { settings } from '@bakan/database/schemas/settings';
import { updateTag } from 'next/cache';

export const updateTax = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'update-taxes' })
  .inputSchema(taxesSchema)
  .action(async ({ parsedInput: { title, description, taxValue } }) => {
    await db
      .insert(settings)
      .values({ section: 'taxes', title, description, metaData: { taxValue } })
      .onConflictDoUpdate({
        target: settings.section,
        set: { title, description, metaData: { taxValue } },
      });
    updateTag('settings');
  });
