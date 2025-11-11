import { SettingsBanner } from '@/app/(admin)/dashboard/settings/_components/settings-banner';
import { SettingsPage } from '@/app/(admin)/dashboard/settings/_components/settings-page';
import { getHeroSettings, getHomeSettings } from '@/server/query/settings';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@bakan/ui/components/tabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Settings() {
  const [home, hero] = await Promise.all([
    getHomeSettings(),
    getHeroSettings(),
  ]);

  const safeHome = home ?? { title: '', description: '' };
  const safeHero = hero ?? {
    title: '',
    description: '',
    metaData: { btnTitle: '', btnUrl: '' },
  };

  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <section>
        <Tabs defaultValue="page">
          <TabsList>
            <TabsTrigger value="page">Settings Page</TabsTrigger>
            <TabsTrigger value="hero">Settings Banner</TabsTrigger>
          </TabsList>
          <TabsContent value="page">
            <SettingsPage
              title={safeHome.title}
              description={safeHome.description}
            />
          </TabsContent>
          <TabsContent value="hero">
            <SettingsBanner
              metadata={{
                title: safeHero.title ?? '',
                description: safeHero.description ?? '',
                btnTitle: safeHero.metaData.btnTitle ?? '',
                btnUrl: safeHero.metaData.btnUrl ?? '',
              }}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
