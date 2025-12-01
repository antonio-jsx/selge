import type messages from './i18n/messages/en.json';
import type { formats } from './i18n/request';
import type { Locale } from '@selge/i18n';

declare module '@selge/i18n' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
