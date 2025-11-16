'use client';

import type { SectionPages, SettingsContextValue } from '@/lib/types';
import type { SelectSettings } from '@bakan/database/schemas/settings';
import { createContext, useContext } from 'react';

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SelectSettings[];
}) {
  const getSettingsBySection = (section: SectionPages) =>
    settings.find((item) => item.section === section);

  return (
    <SettingsContext.Provider value={{ getSettingsBySection }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
}
