import 'server-only';

import type { HeroSettings } from '@/types';
import { db } from '@bakan/database';
import type { SelectSettings } from '@bakan/database/schemas/settings';
import { cacheTag } from 'next/cache';

export async function getHomeSettings(): Promise<SelectSettings | null> {
  'use cache';
  cacheTag('home');

  const settings = await db.query.settings.findFirst({
    where: (settings, { eq }) => eq(settings.section, 'home'),
  });

  if (!settings) return null;

  return settings;
}

export async function getHeroSettings(): Promise<HeroSettings | null> {
  'use cache';
  cacheTag('hero');

  const settings = await db.query.settings.findFirst({
    where: (settings, { eq }) => eq(settings.section, 'hero'),
  });

  if (!settings) return null;

  return {
    ...settings,
    metaData: settings.metaData as { btnTitle: string; btnUrl: string },
  };
}
