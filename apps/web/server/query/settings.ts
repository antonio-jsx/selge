import 'server-only';

import { db } from '@selge/database';
import type { SelectSettings } from '@selge/database/schemas/settings';
import { cacheTag } from 'next/cache';

export async function getSettings(): Promise<SelectSettings[]> {
  'use cache';
  cacheTag('settings');

  const settings = await db.query.settings.findMany();

  return settings;
}
