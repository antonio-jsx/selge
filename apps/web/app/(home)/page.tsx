import { getSettings } from '@/server/query/settings';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return { title: settings?.title, description: settings?.description };
}

export default function Home() {
  return <div className="container mx-auto">Welcome</div>;
}
