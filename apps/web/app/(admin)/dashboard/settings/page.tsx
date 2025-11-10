import { SettingsBanner } from '@/app/(admin)/dashboard/settings/_components/settings-banner';
import { SettingsPage } from '@/app/(admin)/dashboard/settings/_components/settings-page';
import { getSettings } from '@/server/query/settings';
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
  const settings = await getSettings();

  if (!settings) return null;

  const { title, description, metaData } = settings;

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
            <SettingsPage title={title} description={description} />
          </TabsContent>
          <TabsContent value="hero">
            <SettingsBanner
              title={metaData?.banner?.title}
              subtitle={metaData?.banner?.subtitle}
              btnTitle={metaData?.banner?.button.title}
              btnUrl={metaData?.banner?.button.link}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
