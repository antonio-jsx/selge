import { db } from '@bakan/database';
import type { Metadata } from 'next';
import { cacheTag } from 'next/cache';

export async function generateMetadata(): Promise<Metadata> {
  'use cache';
  cacheTag('settings');

  const settings = await db.query.settings.findFirst({
    columns: { title: true, description: true },
  });

  return { title: settings?.title, description: settings?.description };
}

export default function Home() {
  return <div className="container mx-auto">Welcome</div>;
}
