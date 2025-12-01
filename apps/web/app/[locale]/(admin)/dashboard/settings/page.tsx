import { SettingsBanner } from '@/app/(admin)/dashboard/settings/_components/settings-banner';
import { SettingsPage } from '@/app/(admin)/dashboard/settings/_components/settings-page';
import { SettingsShipping } from '@/app/(admin)/dashboard/settings/_components/settings-shipping';
import { SettingsTaxes } from '@/app/(admin)/dashboard/settings/_components/settings-taxes';
import { SettingsProvider } from '@/app/(admin)/dashboard/settings/context';
import { getSettings } from '@/server/query/settings';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@selge/ui/components/tabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  const settings = getSettings();

  return (
    <SettingsProvider settings={settings}>
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <section>
        <Tabs defaultValue="page">
          <TabsList>
            <TabsTrigger value="page">General</TabsTrigger>
            <TabsTrigger value="hero">Hero banner</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent className="lg:max-w-lg" value="page">
            <SettingsPage />
          </TabsContent>
          <TabsContent value="hero">
            <SettingsBanner />
          </TabsContent>
          <TabsContent className="lg:max-w-lg" value="taxes">
            <SettingsTaxes />
          </TabsContent>
          <TabsContent className="lg:max-w-lg" value="shipping">
            <SettingsShipping />
          </TabsContent>
        </Tabs>
      </section>
    </SettingsProvider>
  );
}
