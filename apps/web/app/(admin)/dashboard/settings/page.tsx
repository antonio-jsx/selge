import { SettingsBanner } from '@/app/(admin)/dashboard/settings/_components/settings-banner';
import { SettingsPage } from '@/app/(admin)/dashboard/settings/_components/settings-page';
import { SettingsTaxes } from '@/app/(admin)/dashboard/settings/_components/settings-taxes';
import type { HeroSettings, TaxSettings } from '@/lib/types';
import { getSettings } from '@/server/query/settings';
import type { SelectSettings } from '@bakan/database/schemas/settings';
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

  const safeHome = settings.find(
    (item) => item.section === 'home'
  ) as SelectSettings;

  const safeHero = settings.find(
    (item) => item.section === 'hero'
  ) as HeroSettings;

  const safeTax = settings.find(
    (item) => item.section === 'taxes'
  ) as TaxSettings;

  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <section>
        <Tabs defaultValue="page">
          <TabsList>
            <TabsTrigger value="page">General</TabsTrigger>
            <TabsTrigger value="hero">Hero banner</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
          </TabsList>
          <TabsContent className="lg:max-w-lg" value="page">
            <SettingsPage
              title={safeHome?.title ?? ''}
              description={safeHome?.description ?? ''}
            />
          </TabsContent>
          <TabsContent value="hero">
            <SettingsBanner
              metadata={{
                title: safeHero?.title ?? '',
                description: safeHero?.description ?? '',
                btnTitle: safeHero?.metaData.btnTitle ?? '',
                btnUrl: safeHero?.metaData.btnUrl ?? '',
              }}
            />
          </TabsContent>
          <TabsContent className="lg:max-w-lg" value="taxes">
            <SettingsTaxes
              metadata={{
                title: safeTax?.title ?? '',
                description: safeTax?.description ?? '',
                taxValue: safeTax?.metaData.taxValue ?? 0,
              }}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
