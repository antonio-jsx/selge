import { SettingsBanner } from '@/app/(admin)/dashboard/settings/_components/settings-banner';
import { SettingsPage } from '@/app/(admin)/dashboard/settings/_components/settings-page';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@bakan/ui/components/tabs';

export default function Settings() {
  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <section>
        <Tabs defaultValue="page">
          <TabsList>
            <TabsTrigger value="page">Settings Page</TabsTrigger>
            <TabsTrigger value="hero">Hero Banner</TabsTrigger>
          </TabsList>
          <TabsContent value="page">
            <SettingsPage />
          </TabsContent>
          <TabsContent value="hero">
            <SettingsBanner />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
