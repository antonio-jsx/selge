'use client';

import type { SectionPages, SettingsContextValue } from '@/lib/types';
import type { SelectSettings } from '@selge/database/schemas/settings';
import { createContext, use, useContext } from 'react';

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Promise<SelectSettings[]>;
}) {
  const allSettings = use(settings);

  const getSettingsBySection = (section: SectionPages) =>
    allSettings.find((item) => item.section === section);

  return (
    <SettingsContext value={{ getSettingsBySection }}>
      {children}
    </SettingsContext>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
}
