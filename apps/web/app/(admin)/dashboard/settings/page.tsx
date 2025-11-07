import { SettingsPage } from '@/app/(admin)/_components/settings-page';

export default function Settings() {
  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <section>
        <SettingsPage />
      </section>
    </>
  );
}
