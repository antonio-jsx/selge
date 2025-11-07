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
  .action(async ({ parsedInput: { title, description } }) => {
    await db.update(settings).set({ title, description });
    updateTag('settings');
  });
