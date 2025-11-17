'use server';

import { shippingSchema } from '@/app/(admin)/dashboard/settings/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@bakan/database';
import { settings } from '@bakan/database/schemas/settings';
import { updateTag } from 'next/cache';

export const updateShipping = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'update-shipping' })
  .inputSchema(shippingSchema)
  .action(async ({ parsedInput: { title, free, limit } }) => {
    await db
      .insert(settings)
      .values({
        section: 'shipping',
        title,
        description: '',
        metaData: { free, limit },
      })
      .onConflictDoUpdate({
        target: settings.section,
        set: { title, metaData: { free, limit } },
      });
    updateTag('settings');
  });
