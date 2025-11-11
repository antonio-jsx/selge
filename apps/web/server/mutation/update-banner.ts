'use server';

import { bannerSchema } from '@/app/(admin)/dashboard/settings/schema';
import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import { db } from '@bakan/database';
import { settings } from '@bakan/database/schemas/settings';
import { updateTag } from 'next/cache';

export const updateBanner = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'update-banner' })
  .inputSchema(bannerSchema)
  .action(async ({ parsedInput: { title, description, ...rest } }) => {
    await db
      .insert(settings)
      .values({ section: 'hero', title, description, metaData: rest })
      .onConflictDoUpdate({
        target: settings.section,
        set: { title, description, metaData: rest },
      });
    updateTag('hero');
  });
