import { useSettingsContext } from '@/app/(admin)/dashboard/settings/context';
import type { SectionPages } from '@/lib/types';

export function useSectionSettings<T>(
  section: SectionPages,
  defaultValue: T
): T {
  const { getSettingsBySection } = useSettingsContext();
  return (getSettingsBySection(section) as T) ?? defaultValue;
}
