'use server';

import { settingSchema } from '@/app/(admin)/dashboard/settings/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@bakan/database';
import { settings } from '@bakan/database/schemas/settings';
import { updateTag } from 'next/cache';

export const updateSettings = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'update-settings' })
  .inputSchema(settingSchema)
  .action(async ({ parsedInput: data }) => {
    await db
      .insert(settings)
      .values({ ...data, section: 'home' })
      .onConflictDoUpdate({
        target: settings.section,
        set: data,
      });
    updateTag('settings');
  });
