import 'server-only';

import { db } from '@bakan/database';
import type { SelectSettings } from '@bakan/database/schemas/settings';
import { cacheTag } from 'next/cache';

export async function getSettings(): Promise<SelectSettings[]> {
  'use cache';
  cacheTag('settings');

  const settings = await db.query.settings.findMany();

  return settings;
}
