import 'server-only';

import { db } from '@bakan/database';
import { cacheTag } from 'next/cache';

export async function getSettings() {
  'use cache';
  cacheTag('settings');

  const settings = await db.query.settings.findFirst({
    columns: { title: true, description: true },
  });

  return settings;
}
